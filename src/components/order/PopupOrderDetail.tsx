import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
} from "react-native";
import Popup from "../popup/Popup";

interface DimensionsType {
    width: number;
    height: number;
    depth: number;
}

interface Product {
    images: string[];
    title: string;
    rating: number;
    discountPercentage: number;
    price: number;
    brand: string;
    category: string;
    stock: number;
    description: string;
    dimensions?: DimensionsType;
}

interface PopupOrderDetailProps {
    visible: boolean;
    product: Product | null;
    onClose: () => void;
}

const PopupOrderDetail: React.FC<PopupOrderDetailProps> = ({
    visible,
    product,
    onClose,
}) => {
    return (
        <Popup visible={visible} onClose={onClose}>
            {product && (
                <View style={styles.modalContent}>
                    {/* Nút đóng popup*/}
                    <View style={styles.closeButtonContainer}>
                        <Text style={styles.closeButton} onPress={onClose}>
                            ×
                        </Text>
                    </View>

                    {/* Nội dung cuộn */}
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {/* Hiển thị ảnh dạng vuốt ngang */}
                        <FlatList
                            data={product.images} // Dữ liệu ảnh từ danh sách `images`
                            keyExtractor={(item, index) => index.toString()} // Khóa duy nhất cho từng ảnh
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item }} // Đường dẫn ảnh
                                    style={styles.productImage}
                                    resizeMode="contain" // Đảm bảo ảnh không bị cắt
                                />
                            )}
                        />

                        {/* Thông tin sản phẩm */}
                        <View style={styles.mainInfo}>
                            <Text style={styles.productTitle}>
                                {product.title}
                            </Text>

                            <View style={styles.ratingRow}>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>
                                        {product.rating}
                                    </Text>
                                    <Text style={styles.starText}>⭐</Text>
                                </View>
                                <View style={styles.discountTag}>
                                    <Text style={styles.discountText}>
                                        -{product.discountPercentage}%
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.priceText}>
                                Price: ${product.price}
                            </Text>
                        </View>

                        <View style={styles.infoGrid}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Brand</Text>
                                <Text style={styles.infoValue}>
                                    {product.brand}
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Category</Text>
                                <Text style={styles.infoValue}>
                                    {product.category}
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>
                                    Stock Status
                                </Text>
                                <Text
                                    style={[
                                        styles.infoValue,
                                        product.stock > 0
                                            ? styles.inStockText
                                            : styles.outOfStockText,
                                    ]}
                                >
                                    {product.stock > 0
                                        ? `${product.stock} in stock`
                                        : "Out of stock"}
                                </Text>
                            </View>
                            {product.dimensions && (
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>
                                        Dimensions
                                    </Text>
                                    <Text style={styles.infoValue}>
                                        {`${product.dimensions.width}`}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionLabel}>
                                Description
                            </Text>
                            <Text style={styles.descriptionText}>
                                {product.description}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            )}
        </Popup>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "#fff",
        paddingBottom: 20,
        paddingTop: 20,
    },
    closeButtonContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 100,
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    closeButton: {
        fontSize: 20,
        color: "#333",
        fontWeight: "bold",
    },
    scrollContent: {
        // paddingBottom: 20,
        paddingHorizontal: 15,
    },
    productImage: {
        width: Dimensions.get("window").width * 0.8,
        height: 250,
        alignSelf: "center",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
    },
    mainInfo: {
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    productTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fefae0",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    ratingText: {
        fontSize: 16,
        color: "#666",
        marginRight: 5,
    },
    starText: {
        fontSize: 16,
    },
    priceText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2ecc71",
        textAlign: "center",
    },
    discountTag: {
        backgroundColor: "#ff6b6b",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        alignSelf: "center",
    },
    discountText: {
        color: "#fff",
        fontWeight: "bold",
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        marginTop: 15,
        paddingHorizontal: 10,
    },
    infoItem: {
        width: "50%",
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
        textAlign: "center",
    },
    infoValue: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
        textAlign: "center",
    },
    inStockText: {
        color: "#2ecc71",
    },
    outOfStockText: {
        color: "#e74c3c",
    },
    descriptionContainer: {
        marginTop: 15,
    },
    descriptionLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    descriptionText: {
        fontSize: 16,
        color: "#666",
        lineHeight: 24,
        textAlign: "justify",
    },
});

export default PopupOrderDetail;
