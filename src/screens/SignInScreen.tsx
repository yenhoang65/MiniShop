import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { registerValidationSchema } from "../validation/AuthValidation";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Import cấu hình Firebase
import CommonButton from "../components/button/Button"; // Import CommonButton

const SignInScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Google Auth Request
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            "810195372982-mfb6k55bjjjr3s9nuph7fcibiaoie1h2.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);

            setLoading(true);
            // Đăng nhập vào Firebase
            signInWithCredential(auth, credential)
                .then(() => {
                    setLoading(false);
                    navigation.navigate("MyOrders" as never);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Google Sign-In Error:", error);
                    Alert.alert("Lỗi", "Đăng nhập Google thất bại.");
                });
        }
    }, [response]);

    const handleSignIn = (values: { email: string; password: string }) => {
        setLoading(true);
        const fakeUsers = [{ email: "admin@gmail.com", password: "Abc123" }];
        const user = fakeUsers.find(
            (u) => u.email === values.email && u.password === values.password
        );

        if (user) {
            setLoading(false);
            navigation.navigate("MyOrders" as never);
        } else {
            setLoading(false);
            Alert.alert("Lỗi", "Email hoặc mật khẩu không đúng.");
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword" as never);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subtitle}>
                    Hi! Welcome back, you've been missed.
                </Text>
            </View>

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={registerValidationSchema}
                onSubmit={handleSignIn}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={styles.inputContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            {errors.email && touched.email && (
                                <Text style={styles.errorText}>
                                    {errors.email}
                                </Text>
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    styles.inputWithPaddingRight,
                                ]}
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword((prev) => !prev)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={25}
                                    color="gray"
                                />
                            </TouchableOpacity>
                            {errors.password && touched.password && (
                                <Text style={styles.errorText}>
                                    {errors.password}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.forgotPasswordButton}
                            onPress={handleForgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        {loading ? (
                            <ActivityIndicator size="large" color="#000" />
                        ) : (
                            <CommonButton
                                onPress={() => handleSubmit()}
                                className={styles.signInButton}
                            >
                                <Text style={styles.signInText}>Sign In</Text>
                            </CommonButton>
                        )}
                    </View>
                )}
            </Formik>

            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or sign in with</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-apple" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => {
                        if (!request) {
                            Alert.alert(
                                "Lỗi",
                                "Không thể khởi tạo yêu cầu Google."
                            );
                            return;
                        }
                        promptAsync();
                    }}
                >
                    <Ionicons name="logo-google" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-facebook" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register" as never)}
                >
                    <Text style={styles.loginText}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 28,
        backgroundColor: "#fff",
    },
    header: {
        marginBottom: 50,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    inputContainer: {
        width: "100%",
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 17,
        color: "#333",
        marginBottom: 8,
        fontWeight: "600",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
        fontSize: 14,
        color: "#333",
    },
    inputWithPaddingRight: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
        top: 44,
    },
    registerButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 26,
    },
    registerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    orText: {
        marginHorizontal: 20,
        fontSize: 16,
        color: "gray",
    },
    socialButtons: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
        marginBottom: 20,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderWidth: 1,

        borderColor: "#dee2e6",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flexDirection: "row",
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: "gray",
    },
    loginText: {
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 5,
    },

    forgotPasswordButton: {
        alignSelf: "flex-end",
        // marginVertical: 10,
    },
    forgotPasswordText: {
        fontSize: 16,
        // color: "gray",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    signInButton: {
        backgroundColor: "#000",
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 25,
    },
    signInText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
export default SignInScreen;
