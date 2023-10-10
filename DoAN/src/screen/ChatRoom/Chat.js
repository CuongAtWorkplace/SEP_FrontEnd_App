import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


import HeaderBack from "../../../component/HeaderBack";
export default function Chat() {
    const navigation = useNavigation();

    const handleHeader  = () => {
        navigation.navigate('Home');
    };


    return (
        <View>
            <HeaderBack title="Group chat" action={handleHeader} />

            <Text>CHAT DETAIL</Text>
        </View>
    );
}

const styles = StyleSheet.create({

})