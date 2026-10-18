import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../actions/cartActions';
import { addToSaved, removeFromSaved } from '../actions/savedActions';

// Cart and "saved" actions shared by product cards and the product page.
const useShopActions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const savedItems = useSelector((state) => state.saved.savedItems);

    const requireLogin = () => {
        if (isAuthenticated) return true;
        toast.info('Log in to use the cart and saved items.');
        navigate('/login');
        return false;
    };

    const handleAddToCart = async (product, quantity = 1) => {
        if (!requireLogin()) return;
        try {
            await dispatch(addToCart(product._id, quantity));
            toast.success(`${product.name} added to your cart`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const isSaved = (productId) => savedItems.some((item) => item._id === productId);

    const handleToggleSaved = async (product) => {
        if (!requireLogin()) return;
        try {
            if (isSaved(product._id)) {
                await dispatch(removeFromSaved(product._id));
            } else {
                await dispatch(addToSaved(product._id));
                toast.success(`${product.name} saved for later`);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return { handleAddToCart, handleToggleSaved, isSaved };
};

export default useShopActions;
