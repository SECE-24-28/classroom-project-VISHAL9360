// Mock Product Database
export const products = [
    {
        id: 1,
        name: "Apple iPhone 15 Pro Max",
        brand: "Apple",
        category: "Electronics",
        subCategory: "Smartphones",
        price: 144900,
        originalPrice: 159900,
        discount: 9,
        rating: 4.6,
        reviews: 45231,
        image: "https://images.unsplash.com/photo-1678911820864-e5c85248f0a3?w=400",
        description: "6.7-inch Super Retina XDR display, A17 Pro chip, Pro camera system",
        inStock: true,
        trending: true,
        aiRecommended: true,
        specifications: {
            "Display": "6.7-inch OLED",
            "Processor": "A17 Pro",
            "RAM": "8GB",
            "Storage": "256GB",
            "Camera": "48MP + 12MP + 12MP"
        }
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "Electronics",
        subCategory: "Smartphones",
        price: 129999,
        originalPrice: 139999,
        discount: 7,
        rating: 4.5,
        reviews: 38421,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        description: "6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP Camera",
        inStock: true,
        trending: true,
        specifications: {
            "Display": "6.8-inch AMOLED",
            "Processor": "Snapdragon 8 Gen 3",
            "RAM": "12GB",
            "Storage": "256GB",
            "Camera": "200MP + 50MP + 12MP + 10MP"
        }
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Headphones",
        brand: "Sony",
        category: "Electronics",
        subCategory: "Audio",
        price: 29990,
        originalPrice: 34990,
        discount: 14,
        rating: 4.7,
        reviews: 12456,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
        description: "Premium noise cancelling wireless headphones",
        inStock: true,
        aiRecommended: true,
        specifications: {
            "Type": "Over-ear",
            "Battery": "30 hours",
            "Noise Cancelling": "Yes",
            "Bluetooth": "5.2"
        }
    },
    {
        id: 4,
        name: "Dell XPS 15 Laptop",
        brand: "Dell",
        category: "Electronics",
        subCategory: "Laptops",
        price: 184990,
        originalPrice: 199990,
        discount: 8,
        rating: 4.4,
        reviews: 8934,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
        description: "15.6-inch 4K OLED, Intel i9, RTX 4060, 32GB RAM",
        inStock: true,
        trending: true,
        specifications: {
            "Display": "15.6-inch 4K OLED",
            "Processor": "Intel Core i9",
            "RAM": "32GB",
            "Storage": "1TB SSD",
            "Graphics": "RTX 4060"
        }
    },
    {
        id: 5,
        name: "Nike Air Zoom Pegasus",
        brand: "Nike",
        category: "Fashion",
        subCategory: "Footwear",
        price: 8995,
        originalPrice: 11995,
        discount: 25,
        rating: 4.3,
        reviews: 15672,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        description: "Men's running shoes with responsive cushioning",
        inStock: true,
        specifications: {
            "Type": "Running Shoes",
            "Material": "Mesh + Synthetic",
            "Sole": "Rubber"
        }
    },
    {
        id: 6,
        name: "Levi's Men's Denim Jacket",
        brand: "Levi's",
        category: "Fashion",
        subCategory: "Clothing",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        rating: 4.5,
        reviews: 9821,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        description: "Classic trucker jacket in premium denim",
        inStock: true,
        trending: true,
        specifications: {
            "Material": "100% Cotton Denim",
            "Fit": "Regular",
            "Closure": "Button"
        }
    },
    {
        id: 7,
        name: "LG 55-inch 4K OLED TV",
        brand: "LG",
        category: "Electronics",
        subCategory: "Televisions",
        price: 149990,
        originalPrice: 179990,
        discount: 17,
        rating: 4.6,
        reviews: 5643,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
        description: "OLED evo technology, α9 Gen6 AI Processor, Dolby Vision",
        inStock: true,
        aiRecommended: true,
        specifications: {
            "Screen Size": "55 inches",
            "Resolution": "4K UHD",
            "Panel": "OLED",
            "Refresh Rate": "120Hz",
            "HDR": "Dolby Vision, HDR10"
        }
    },
    {
        id: 8,
        name: "Boat Airdopes 141",
        brand: "Boat",
        category: "Electronics",
        subCategory: "Audio",
        price: 1299,
        originalPrice: 2990,
        discount: 57,
        rating: 4.2,
        reviews: 89456,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
        description: "True wireless earbuds with 42H playback",
        inStock: true,
        trending: true,
        specifications: {
            "Battery": "42 hours",
            "Driver": "8mm",
            "Bluetooth": "5.2",
            "Water Resistance": "IPX4"
        }
    },
    {
        id: 9,
        name: "Adidas Ultraboost 23",
        brand: "Adidas",
        category: "Fashion",
        subCategory: "Footwear",
        price: 16999,
        originalPrice: 19999,
        discount: 15,
        rating: 4.6,
        reviews: 7234,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
        description: "Premium running shoes with Boost technology",
        inStock: true,
        aiRecommended: true,
        specifications: {
            "Type": "Running Shoes",
            "Technology": "Boost",
            "Upper": "Primeknit"
        }
    },
    {
        id: 10,
        name: "Titan Edge Ceramic Watch",
        brand: "Titan",
        category: "Fashion",
        subCategory: "Watches",
        price: 12995,
        originalPrice: 15995,
        discount: 19,
        rating: 4.4,
        reviews: 4521,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
        description: "Ultra-slim ceramic watch with sapphire crystal",
        inStock: true,
        specifications: {
            "Case Material": "Ceramic",
            "Movement": "Quartz",
            "Water Resistance": "30m"
        }
    },
    {
        id: 11,
        name: "Canon EOS R6 Mark II",
        brand: "Canon",
        category: "Electronics",
        subCategory: "Cameras",
        price: 249990,
        originalPrice: 269990,
        discount: 7,
        rating: 4.8,
        reviews: 2134,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
        description: "24.2MP Full-frame mirrorless camera",
        inStock: true,
        trending: true,
        specifications: {
            "Sensor": "24.2MP Full-frame",
            "Video": "4K 60fps",
            "ISO": "100-102400",
            "AF Points": "1053"
        }
    },
    {
        id: 12,
        name: "PlayStation 5 Console",
        brand: "Sony",
        category: "Electronics",
        subCategory: "Gaming",
        price: 54990,
        originalPrice: 54990,
        discount: 0,
        rating: 4.7,
        reviews: 23456,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
        description: "Next-gen gaming console with 4K gaming",
        inStock: false,
        trending: true,
        specifications: {
            "CPU": "AMD Zen 2",
            "GPU": "AMD RDNA 2",
            "Storage": "825GB SSD",
            "Resolution": "4K"
        }
    }
];

export const categories = [
    {
        id: 1,
        name: "Electronics",
        icon: "Laptop",
        subCategories: ["Smartphones", "Laptops", "Televisions", "Audio", "Cameras", "Gaming"]
    },
    {
        id: 2,
        name: "Fashion",
        icon: "Shirt",
        subCategories: ["Clothing", "Footwear", "Watches", "Accessories"]
    },
    {
        id: 3,
        name: "Home & Kitchen",
        icon: "Home",
        subCategories: ["Furniture", "Appliances", "Decor", "Kitchen"]
    },
    {
        id: 4,
        name: "Beauty",
        icon: "Sparkles",
        subCategories: ["Skincare", "Makeup", "Haircare", "Fragrances"]
    },
    {
        id: 5,
        name: "Sports",
        icon: "Dumbbell",
        subCategories: ["Fitness", "Outdoor", "Cycling", "Gym Equipment"]
    }
];

// Helper functions
export const getProductById = (id) => products.find(p => p.id === id);

export const getProductsByCategory = (category) =>
    products.filter(p => p.category === category);

export const getProductsBySubCategory = (subCategory) =>
    products.filter(p => p.subCategory === subCategory);

export const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.brand.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery)
    );
};

export const filterProducts = (filters) => {
    let filtered = [...products];

    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.subCategory) {
        filtered = filtered.filter(p => p.subCategory === filters.subCategory);
    }

    if (filters.brand && filters.brand.length > 0) {
        filtered = filtered.filter(p => filters.brand.includes(p.brand));
    }

    if (filters.priceRange) {
        filtered = filtered.filter(p =>
            p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
        );
    }

    if (filters.rating) {
        filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    if (filters.inStock) {
        filtered = filtered.filter(p => p.inStock);
    }

    return filtered;
};

export const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'popularity':
            return sorted.sort((a, b) => b.reviews - a.reviews);
        case 'discount':
            return sorted.sort((a, b) => b.discount - a.discount);
        default:
            return sorted;
    }
};
