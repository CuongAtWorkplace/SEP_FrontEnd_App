import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import HeaderBack from "../../../component/HeaderBack";
import { View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from "../../../constants/theme";


export default function updateProfile() {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Profile');
    };

    return (
        <ScrollView style={styles.container}>
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
                <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 20 }}>Ngo Ba Cuong</Text>

                <View style={styles.inputContainer}>
                    <AntDesign style={styles.inputIcon} name="mail" size={35} color="black" />
                    <TextInput
                        style={styles.textInput}
                        value="Ngobacuong2211@gmail.com"
                        placeholder="Enter your custom text"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <AntDesign style={styles.inputIcon} name="user" size={35} color="black" />
                    <TextInput
                        style={styles.textInput}
                        value="Ngo Ba Cuong"
                        placeholder="Enter your custom text"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Feather style={styles.inputIcon} name="phone" size={35} color="black" />
                    <TextInput
                        style={styles.textInput}
                        value="0964918288"
                        placeholder="Enter your custom text"
                        keyboardType="numeric" // Chỉ cho phép nhập chữ số
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="location-outline" style={styles.inputIcon} size={35} color="black" />
                    <TextInput
                        style={styles.textInput}
                        value="Hà Nội , Việt Nam"
                        placeholder="Enter your custom text"
                        keyboardType="numeric" // Chỉ cho phép nhập chữ số
                    />
                </View>
                <TouchableOpacity style={styles.ButtonContainer}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        marginTop: 30,
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
    inputContainer: {
        flexDirection: "row", // Hiển thị theo hàng ngang
        alignItems: "center",
        margin: 10,
        width: 300, // Điều chỉnh chiều rộng của View chứa TextInput và biểu tượng
    },
    inputIcon: {
        marginRight: 10, // Khoảng cách giữa biểu tượng và TextInput
        marginTop: 5
    },
    textInput: {
        flex: 1, // Để TextInput mở rộng để lấp đầy không gian còn lại trong View
        borderWidth: 1, // Độ dày của border bottom
        borderColor: "gray", // Màu sắc của border bottom
        padding: 5, // Tăng giá trị paddingBottom để đưa border bottom gần hơn với TextInput
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    ButtonContainer: {
        margin:10,
        backgroundColor: '#3E427B',
        width: 90,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
