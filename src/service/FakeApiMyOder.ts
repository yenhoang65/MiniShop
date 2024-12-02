export type Order = {
    id: number;
    title: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
};

export type FakeAPI = {
    active: Order[];
    completed: Order[];
    cancelled: Order[];
};

const images = [
    "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg",
    "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg",
    "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
];

const fakeAPI: FakeAPI = {
    active: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Active Item ${i + 1}`,
        size: ["S", "M", "L", "XL"][i % 4],
        quantity: (i % 5) + 1,
        price: parseFloat(((i + 1) * 10).toFixed(2)),
        image: images[i % images.length],
    })),
    completed: Array.from({ length: 15 }, (_, i) => ({
        id: i + 16,
        title: `Completed Item ${i + 1}`,
        size: ["S", "M", "L", "XL"][i % 4],
        quantity: (i % 5) + 1,
        price: parseFloat(((i + 1) * 12).toFixed(2)),
        image: images[i % images.length],
    })),
    cancelled: Array.from({ length: 15 }, (_, i) => ({
        id: i + 31,
        title: `Cancelled Item ${i + 1}`,
        size: ["S", "M", "L", "XL"][i % 4],
        quantity: (i % 5) + 1,
        price: parseFloat(((i + 1) * 8).toFixed(2)),
        image: images[i % images.length],
    })),
};

export default fakeAPI;
