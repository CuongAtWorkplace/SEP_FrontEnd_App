import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";
import { Button } from "react-native-paper";

import myGlobalVariable from "../../global";
import HeaderBack from "../../../component/HeaderBack";
import { colors } from "react-native-elements";



export default function UpdateProfile() {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState("https://stockdep.net/files/images/45572075.jpg");
    const [isLoading, setLoading] = useState(true);
    const [UserData, setUserData] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const URL = myGlobalVariable;
    const UserID = 3;

    useEffect(() => {
        (async () => {
            const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (mediaStatus !== 'granted') {
                alert('Quyền truy cập vào thư viện ảnh bị từ chối!');
            }

            async function getUser() {
                try {
                    const response = await fetch(URL + '/api/User/GetStudentById/' + UserID);
                    if (response.ok) {
                        const user = await response.json();
                        setUserData(user);
                        setFullName(user[0]?.fullName || '');
                        setEmail(user[0]?.email || '');
                        setPhone(user[0]?.phone || '');
                        setAddress(user[0]?.address || '');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
            getUser();
        })();
    }, []);

    const handleBack = () => {
        navigation.navigate('Profile');
    };

    const updateUserProfile = async () => {

        try {
            // Tạo đối tượng userUpdate chứa thông tin cập nhật
            const userUpdate = {
                fullName: fullName,
                email: email,
                phone: phone,
                address: address
            };

            const response = await fetch(URL + '/api/User/UpdateStudentById/' + UserID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userUpdate),
            });

            if (response.ok) {
                Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
            } else {
                Alert.alert('Lỗi', 'Cập nhật thông tin thất bại');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi yêu cầu.');
        }
    };


    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);

                // Tạo FormData để gửi dữ liệu ảnh
                const formData = new FormData();
                formData.append('file', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg', // Loại ảnh, bạn có thể điều chỉnh tùy theo định dạng ảnh
                    name: 'image.jpg', // Tên tệp trên máy chủ
                });

                try {
                    const response = await fetch(URL + '/api/User/UploadImage/' + UserID, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data', // Định dạng gửi dữ liệu
                        },
                    });

                    if (response.ok) {
                        Alert.alert('Thông báo', 'Cập nhật ảnh thành công');
                    } else {
                        Alert.alert('Lỗi', 'Cập nhật ảnh thất bại');
                    }
                } catch (error) {
                    console.error(error);
                    Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi yêu cầu.');
                }
            }
        }
    }

    function validateEmail(email) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    function validatePhoneNumber(phoneNumber) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
        const regex = /^\d{10}$/; // Ví dụ: 10 chữ số liên tiếp
        return regex.test(phoneNumber);
    }

    function validateLocationString(inputString) {
        // Biểu thức chính quy để kiểm tra tên thành phố và tên đất nước của Việt Nam
        const regex =/^[^\d,]+,\s*Việt Nam$/;
        return regex.test(inputString);
    }


    function Test() {
        let isValid = true; // Biến để kiểm tra xem tất cả đều hợp lệ
        let noti = '';
        if (!validateEmail(email)) {
            isValid = false;
            noti = noti + "Email Format "
        }

        if (!validatePhoneNumber(phone)) {
            isValid = false;
            noti = noti + "Phone Format"
        }

        if (!validateLocationString(address)) {
            isValid = false;
            noti = noti + "Adress Format"
        } 

        if (isValid) {
            Alert.alert('Notification', 'Your Profile has updated successfully');
            updateUserProfile();
        } else {
            Alert.alert('Error', 'Wrong ' + noti);
        }
    }



    return (
        <ScrollView style={styles.container}>
            <HeaderBack title="Update Profile" action={handleBack} />


            {isLoading ? ( // Hiển thị ActivityIndicator nếu isLoading là true
                <ActivityIndicator size="large" color={colors.black} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: selectedImage }}
                    />
                    <TouchableOpacity style={styles.iconContainer} onPress={openImagePicker}>
                        <Ionicons name="camera" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 20 }}>
                        {UserData[0]?.fullName}
                    </Text>

                    <View style={styles.inputContainer}>
                        <AntDesign style={styles.inputIcon} name="mail" size={35} color="black" />
                        <TextInput
                            style={styles.textInput}
                            value={email}
                            placeholder="Enter your custom text"
                            onChangeText={text => setEmail(text)} // Cập nhật giá trị của address khi thay đổi
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <AntDesign style={styles.inputIcon} name="user" size={35} color="black" />
                        <TextInput
                            style={styles.textInput}
                            value={fullName}
                            placeholder="Enter your custom text"
                            onChangeText={text => setFullName(text)} // Cập nhật giá trị của address khi thay đổi

                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Feather style={styles.inputIcon} name="phone" size={35} color="black" />
                        <TextInput
                            style={styles.textInput}
                            value={phone}
                            placeholder="Enter your custom text"
                            keyboardType="numeric"
                            onChangeText={text => setPhone(text)} // Cập nhật giá trị của address khi thay đổi
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="location-outline" style={styles.inputIcon} size={35} color="black" />
                        <TextInput
                            style={styles.textInput}
                            value={address}
                            placeholder="Enter your custom text"
                            onChangeText={text => setAddress(text)} // Cập nhật giá trị của address khi thay đổi

                        />
                    </View>



                    <Button style={styles.buttonContainer} onPress={Test}>
                        <Text style={styles.buttonText}>Update</Text>
                    </Button>



                    {isLoading && <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />}
                </View>
            )}

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
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        width: 300,
    },
    inputIcon: {
        marginRight: 10,
        marginTop: 5
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonContainer: {
        margin: 10,
        backgroundColor: '#3E427B',
        width: 90,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        marginTop: 20,
    }
});
