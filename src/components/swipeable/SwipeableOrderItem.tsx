import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Popup from "../popup/Popup";
import { Ionicons } from "@expo/vector-icons";
import CommonButton from "../button/Button";

type SwipeableOrderItemProps = {
    item: any;
    onDelete: (id: number) => void; // Callback khi xóa
    children: React.ReactNode;
    onSwipeStart?: (ref: any) => void; // Callback khi bắt đầu swipe
};

const SwipeableOrderItem: React.FC<SwipeableOrderItemProps> = ({
    item,
    onDelete,
    children,
    onSwipeStart,
}) => {
    const swipeableRef = useRef<any>(null); // Ref cho Swipeable
    const [isPopupVisible, setPopupVisible] = useState(false); // Trạng thái mở/đóng popup

    const handleDelete = () => {
        setPopupVisible(false); // Ẩn popup sau khi xóa
        onDelete(item.id); // Gọi callback xóa
    };

    const handleCancel = () => {
        setPopupVisible(false); // Đóng popup khi nhấn nút "Hủy"
    };

    const renderRightActions = () => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setPopupVisible(true)} // Hiển thị popup khi nhấn nút "Xóa"
        >
            <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
    );

    return (
        <Swipeable
            ref={(ref) => {
                swipeableRef.current = ref;
            }}
            renderRightActions={renderRightActions}
            onSwipeableOpen={() => onSwipeStart?.(swipeableRef)}
            overshootRight={false}
        >
            {children}

            {/* Sử dụng Popup */}
            <Popup
                visible={isPopupVisible}
                onClose={handleCancel} // Đóng popup khi nhấn nút "Đóng"
            >
                <View style={styles.popupContent}>
                    <View style={styles.trashIconContainer}>
                        <Ionicons
                            name="trash-outline"
                            size={40}
                            style={styles.trashIcon}
                        />
                    </View>
                    <Text style={styles.popupText}>
                        Bạn có chắc chắn muốn xóa mục này không?
                    </Text>
                    <View style={styles.popupActions}>
                        <CommonButton
                            className={styles.cancelButton}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </CommonButton>
                        <CommonButton
                            className={styles.confirmButton}
                            onPress={handleDelete}
                        >
                            <Text style={styles.confirmText}>Xác nhận</Text>
                        </CommonButton>
                    </View>
                </View>
            </Popup>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    popupContent: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 5,
        width: "100%",
        maxWidth: 400,
    },

    deleteButton: {
        backgroundColor: "#ff5252",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
    },
    trashIconContainer: {
        backgroundColor: "#ffeaea",
        borderRadius: 50,
        padding: 15,
        marginBottom: 15,
    },
    trashIcon: {
        color: "#ff5252",
    },
    popupText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "500",
    },
    popupActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 8,
        backgroundColor: "#f5f5f5",
        borderRadius: 25,
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    cancelText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 16,
    },
    confirmButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: "#ff5252",
        borderRadius: 25,
        alignItems: "center",
    },
    confirmText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default SwipeableOrderItem;
