const TOKEN_KEY = 'shop:token';

export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const setToken = (token) => {
    try {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        else localStorage.removeItem(TOKEN_KEY);
    } catch {
        // Storage can be blocked; the session then lasts until the page is reloaded.
    }
};
