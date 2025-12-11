import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart Store
export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    });
                } else {
                    set({ items: [...items, { ...product, quantity }] });
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter(item => item.id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                } else {
                    set({
                        items: get().items.map(item =>
                            item.id === productId ? { ...item, quantity } : item
                        )
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'cart-storage'
        }
    )
);

// Wishlist Store
export const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const items = get().items;
                if (!items.find(item => item.id === product.id)) {
                    set({ items: [...items, product] });
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter(item => item.id !== productId) });
            },

            isInWishlist: (productId) => {
                return get().items.some(item => item.id === productId);
            },

            clearWishlist: () => set({ items: [] })
        }),
        {
            name: 'wishlist-storage'
        }
    )
);

// User Store
export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (userData) => {
                set({ user: userData, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (updates) => {
                set(state => ({ user: { ...state.user, ...updates } }));
            }
        }),
        {
            name: 'user-storage'
        }
    )
);

// Search Store
export const useSearchStore = create((set) => ({
    searchQuery: '',
    searchResults: [],
    recentSearches: [],

    setSearchQuery: (query) => set({ searchQuery: query }),

    setSearchResults: (results) => set({ searchResults: results }),

    addRecentSearch: (query) => {
        set(state => ({
            recentSearches: [
                query,
                ...state.recentSearches.filter(s => s !== query)
            ].slice(0, 10)
        }));
    },

    clearSearchResults: () => set({ searchResults: [], searchQuery: '' })
}));
