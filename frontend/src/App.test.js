import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { createAppStore } from './store';

test('renders the homepage hero and navigation', async () => {
    render(
        <Provider store={createAppStore()}>
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    expect(screen.getByRole('heading', { name: /find the bike that fits your ride/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shop now/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /log in/i }).length).toBeGreaterThan(0);
});
