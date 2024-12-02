import React, { forwardRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import SwipeableOrderItem from "../swipeable/SwipeableOrderItem";

type Order = {
    id: number;
    title: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
};

type OrderItemProps = {
    item: Order;
    onTrackOrder: (id: number) => void;
    onDelete: (id: number) => void;
    onSwipeStart?: (ref: any) => void; // Thêm thuộc tính onSwipeStart
};

const OrderItem: React.FC<OrderItemProps> = ({
    item,
    onTrackOrder,
    onDelete,
    onSwipeStart, // Nhận onSwipeStart từ props
}) => {
    return (
        <SwipeableOrderItem
            item={item}
            onDelete={onDelete}
            onSwipeStart={onSwipeStart} // Truyền onSwipeStart xuống SwipeableOrderItem
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.details}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>
                        Size: {item.size} | Qty: {item.quantity}pcs
                    </Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onTrackOrder(item.id)} // Gọi callback khi bấm nút
                >
                    <Text style={styles.buttonText}>Track Order</Text>
                </TouchableOpacity>
            </View>
        </SwipeableOrderItem>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#fff",
        alignItems: "center",
        borderBottomColor: "#dee2e6",
        borderBottomWidth: 1,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#212121",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#757575",
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },
    button: {
        backgroundColor: "#333",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 60,
    },
    buttonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "500",
    },
});

export default OrderItem;
