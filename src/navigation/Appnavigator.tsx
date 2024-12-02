import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../service/Types"; // Đường dẫn đến tệp types.ts

// import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import MyOrderScreen from "../screens/MyOderScreen";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                }}
            >
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        title: "Sign In", // Tiêu đề
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={SignUp}
                    options={{
                        title: "Login",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="MyOrders"
                    component={MyOrderScreen}
                    options={{
                        title: "My Orders", // Tiêu đề
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
