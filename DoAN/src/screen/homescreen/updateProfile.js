import React from "react";
import { useNavigation } from "@react-navigation/native";

import HeaderBack from "../../../component/HeaderBack";


export default function updateProfile() {

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Profile')
    };


    return (
        <HeaderBack title='Update Profile' action={handleBack} />
    );
}