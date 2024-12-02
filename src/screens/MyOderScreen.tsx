import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { FlashList } from "@shopify/flash-list";
import OrderItem from "../components/order/OrderItem";
import { fetchOrders, fetchOrderDetail } from "../service/myOrder/FetchOrder";
import PopupOrderDetail from "../components/order/PopupOrderDetail";

type Order = {
    id: number;
    title: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
};

const MyOrderScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "active", title: "Active" },
        { key: "completed", title: "Completed" },
        { key: "cancelled", title: "Cancelled" },
    ]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const swipeableRef = useRef<any>(null); // Ref lưu Swipeable đang mở

    const ITEMS_PER_PAGE = 20; // Số sản phẩm mỗi lần tải

    // Xóa đơn hàng
    const handleDeleteOrder = (id: number) => {
        setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== id)
        );
    };

    const handleSwipeStart = (ref: any) => {
        if (swipeableRef.current && swipeableRef.current !== ref.current) {
            // Kiểm tra ref trước khi gọi close
            swipeableRef.current.close?.();
        }
        swipeableRef.current = ref.current; // Cập nhật ref hiện tại
    };

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            const data = await fetchOrders(ITEMS_PER_PAGE, 0); // Tải 20 sản phẩm đầu tiên
            setOrders(data);
            setPage(1); // Đặt trang hiện tại là 1
            setLoading(false);
        };

        loadOrders();
    }, []);

    const loadMoreOrders = async () => {
        if (loadingMore) return; // Tránh gọi API khi đang tải thêm
        setLoadingMore(true);
        try {
            const skip = page * ITEMS_PER_PAGE; // Vị trí bắt đầu tải tiếp
            const data = await fetchOrders(ITEMS_PER_PAGE, skip);
            if (data.length > 0) {
                setOrders((prevOrders) => [...prevOrders, ...data]); // Thêm sản phẩm vào danh sách
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error("Error loading more orders:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleTrackOrder = async (id: number) => {
        try {
            const data = await fetchOrderDetail(id);
            setSelectedProduct(data);
            setModalVisible(true);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }: { route: { key: string } }) => (
                    <FlashList
                        data={orders} // Hiển thị danh sách sản phẩm
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }: { item: Order }) => (
                            <OrderItem
                                item={item}
                                onTrackOrder={handleTrackOrder}
                                onDelete={handleDeleteOrder}
                                onSwipeStart={handleSwipeStart} // Truyền callback để quản lý Swipeable
                            />
                        )}
                        estimatedItemSize={100}
                        onEndReached={loadMoreOrders}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() =>
                            loadingMore ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#000"
                                    style={{ marginVertical: 10 }}
                                />
                            ) : null
                        }
                    />
                )}
                onIndexChange={setIndex}
                swipeEnabled={false}
                initialLayout={{ width: Dimensions.get("window").width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicator}
                        style={styles.tabBar}
                        // labelStyle={{
                        //     fontSize: 18, // Tăng kích thước chữ
                        //     fontWeight: "bold", // Chữ đậm hơn
                        // }}
                        activeColor="#000"
                        inactiveColor="#999"
                        pressColor="transparent"
                        pressOpacity={1}
                    />
                )}
            />

            <PopupOrderDetail
                visible={modalVisible}
                product={selectedProduct}
                onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    tabBar: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
    },

    indicator: {
        backgroundColor: "#000", // Màu thanh kẻ
        height: 2,
        width: Dimensions.get("window").width / 3 - 40, // Độ dài thanh (giảm trừ để ngắn hơn chiều rộng tab)
        marginLeft: 20,
        alignSelf: "center",
    },

    labelStyle: {
        fontSize: 16,
        fontWeight: "600",
    },
});

export default MyOrderScreen;
