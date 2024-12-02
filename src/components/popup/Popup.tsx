import { StyleSheet, View, Modal } from "react-native";

interface PopupProps {
    visible: boolean; // Trạng thái mở/đóng modal
    onClose: () => void; // Callback để đóng modal
    children: React.ReactNode; // Nội dung sẽ được truyền vào qua children
}

const Popup: React.FC<PopupProps> = ({ visible, onClose, children }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>{children}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 15,
        width: "95%",
        maxHeight: "90%",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Popup;
