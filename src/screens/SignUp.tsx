import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CommonButton from "../components/button/Button";

const SignUp = () => {
    return (
        <View>
            <CommonButton className={styles.buttonTest}>
                <Text style={styles.text}>Sign Innnnnn</Text>
            </CommonButton>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonTest: {
        borderWidth: 1,
        fontSize: 100,
        marginTop: 100,
    },
    text: {
        color: "#fff",
    },
});

export default SignUp;
