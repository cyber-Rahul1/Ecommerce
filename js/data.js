const products = [
    {
        id: 1,
        name: "AirPods Pro",
        price: 145,
        category: "Electronic",
        rating: 5.0,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg",
        description: "Active noise cancellation for immersive sound. Transparency mode for hearing what's happening around you.",
        liked: false,
        available: true
    },
    {
        id: 2,
        name: "MacBook Pro M1",
        price: 435,
        category: "Electronic",
        rating: 5.0,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=452&hei=420&fmt=jpeg",
        description: "Apple's most powerful notebooks featuring fast M1 processors, incredible graphics, and spectacular Retina displays.",
        liked: false,
        available: true
    },
    {
        id: 3,
        name: "iPhone 14 Pro",
        price: 999,
        category: "Electronic",
        rating: 4.9,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg",
        description: "The ultimate iPhone with Dynamic Island, a 48MP camera for mind-blowing detail, and all-day battery life.",
        liked: false,
        available: true
    },
    {
        id: 4,
        name: "iPad Air",
        price: 599,
        category: "Electronic",
        rating: 4.8,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=470&hei=556&fmt=png-alpha",
        description: "Serious performance in a thin and light design with the M1 chip, 10.9-inch Liquid Retina display, and 5G.",
        liked: false,
        available: true
    },
    {
        id: 5,
        name: "Apple Watch Series 8",
        price: 399,
        category: "Electronic",
        rating: 4.8,
        reviews: [
            { user: "John D.", rating: 5, comment: "Amazing battery life and features!" },
            { user: "Sarah M.", rating: 4, comment: "Great health tracking capabilities" }
        ],
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MNP73_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg",
        description: "Advanced health features, including temperature sensing and Crash Detection.",
        liked: false,
        available: true
    },
    {
        id: 6,
        name: "AirPods Max",
        price: 549,
        category: "Electronic",
        rating: 4.7,
        reviews: [
            { user: "Mike R.", rating: 5, comment: "Best noise cancellation ever!" },
            { user: "Emma L.", rating: 4, comment: "Premium build quality, bit pricey though" }
        ],
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=470&hei=556&fmt=png-alpha",
        description: "High-fidelity audio, Active Noise Cancellation, and spatial audio.",
        liked: false,
        available: true
    },
    {
        id: 7,
        name: "iPad Pro M2",
        price: 799,
        category: "Electronic",
        rating: 4.9,
        reviews: [
            { user: "David K.", rating: 5, comment: "Perfect for digital art and productivity!" },
            { user: "Lisa M.", rating: 5, comment: "The M2 chip is incredibly fast" }
        ],
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=470&hei=556&fmt=png-alpha",
        description: "Supercharged by M2 chip, 12.9-inch Liquid Retina XDR display, and Apple Pencil hover.",
        liked: false,
        available: true
    },
    {
        id: 8,
        name: "Apple TV 4K",
        price: 129,
        category: "Electronic",
        rating: 4.7,
        reviews: [
            { user: "Tom H.", rating: 5, comment: "Amazing picture quality and smooth interface" },
            { user: "Anna P.", rating: 4, comment: "Great for streaming, wish it had more games" }
        ],
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202210?wid=470&hei=556&fmt=png-alpha",
        description: "The Apple TV 4K brings the best of TV together with your favorite Apple devices and services.",
        liked: false,
        available: true
    },
    {
        id: 9,
        name: "HomePod mini",
        price: 99,
        category: "Electronic",
        rating: 4.6,
        reviews: [
            { user: "Rachel S.", rating: 5, comment: "Incredible sound for its size!" },
            { user: "Mark L.", rating: 4, comment: "Great smart home controller" }
        ],
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-orange-202110?wid=470&hei=556&fmt=png-alpha",
        description: "Room-filling sound, Siri intelligence, smart home control, and intercom messaging.",
        liked: false,
        available: true
    },
    {
        id: 10,
        name: "Magic Keyboard",
        price: 299,
        category: "Electronic",
        rating: 4.5,
        reviews: [
            { user: "Chris B.", rating: 4, comment: "Great typing experience, bit pricey" },
            { user: "Maria G.", rating: 5, comment: "Perfect companion for the iPad Pro" }
        ],
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MMMR3?wid=470&hei=556&fmt=png-alpha",
        description: "Full-size keyboard with trackpad transforms iPad into a laptop experience.",
        liked: false,
        available: true
    }
];

const categories = [
    { id: 1, name: "All", active: true },
    { id: 2, name: "Electronic", active: false },
    { id: 3, name: "Beauty", active: false },
    { id: 4, name: "Fashion", active: false },
    { id: 5, name: "Toys", active: false }
]; 