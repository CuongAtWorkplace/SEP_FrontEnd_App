import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HeaderBack from "../../../component/HeaderBack";
import { View, Image, TouchableOpacity , Text } from "react-native";
import { Ionicons  } from "@expo/vector-icons";

export default function updateProfile() {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <HeaderBack title="Update Profile" action={handleBack} />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            "https://stockdep.net/files/images/45572075.jpg",
                    }}
                />
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="camera" size={40} color="white" />
                </TouchableOpacity>
                <Text style ={{fontWeight: 'bold' ,fontSize: 20}}>Ngo Ba Cuong</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        marginTop:30,
        alignItems: "center",
        position: "relative",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 40,
    },
    iconContainer: {
        position: "absolute",
        top: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        padding: 10,
    },


});
