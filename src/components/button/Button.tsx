import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from "react-native";

type CommonButtonProps = {
    onPress?: () => void; // Hàm được gọi khi nhấn
    children?: React.ReactNode; // Nội dung bên trong button
    className?: ViewStyle; // Style tùy chỉnh cho button
};

const CommonButton: React.FC<CommonButtonProps> = ({
    onPress,
    children,
    className,
}) => {
    return (
        <TouchableOpacity style={[styles.button, className]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#aaa",
    },
});

export default CommonButton;
