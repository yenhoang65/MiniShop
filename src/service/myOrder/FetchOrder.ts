import api from "../ApiService";

const calculateSize = (width: number): string => {
    if (width >= 7 && width <= 15) {
        return "S";
    }
    if (width > 15 && width <= 22) {
        return "M";
    }
    if (width > 22 && width <= 30) {
        return "L";
    }
    return "Không xác định";
};

export const fetchOrders = async (limit: number, skip: number) => {
    try {
        const response = await api.get("/products", {
            params: {
                limit,
                skip,
                select: "title,price,thumbnail,stock,dimensions",
            },
        });

        return response.data.products.map((item: any) => ({
            id: item.id,
            title: item.title,
            size:
                item.dimensions && item.dimensions.width
                    ? calculateSize(item.dimensions.width)
                    : "Không xác định",
            quantity: item.stock,
            price: item.price,
            image: item.thumbnail,
        }));
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};

// Hàm lấy chi tiết sản phẩm
export const fetchOrderDetail = async (id: number) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data; // Trả về dữ liệu chi tiết sản phẩm
    } catch (error) {
        console.error("Error fetching product detail:", error);
        throw error;
    }
};
