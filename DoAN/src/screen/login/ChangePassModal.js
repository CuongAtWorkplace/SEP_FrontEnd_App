import React from "react"
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useRef } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useState } from "react";
import myGlobalVariable from "../../global";
import { Alert } from "react-native";


const ChangePassModal = ({ closeModal, email }) => {
    const URL = myGlobalVariable;
    const [pass, setPass] = useState("");
    const [ConPass, setConPass] = useState("");

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = () => {
        if (pass === ConPass) {
            if (isPasswordValid(pass)) {
                updatePasswordApi(email, pass)
                Alert.alert("Password changed successfully!");
                closeModal();
            }
            else {
                Alert.alert("Password must be at least 10 characters long and contain at least one uppercase letter and one digit.");

            }
            closeModal();
        } else {
            // Thông báo khi mật khẩu không trùng khớp
            Alert.alert("Passwords do not match!");
        }
    };


    const updatePasswordApi = async (email, newPassword) => {
        try {
            const apiUrl = URL + `/api/User/UpdateUserPassword/UpdateUserPassword/${email}/${newPassword}`;
            const response = await fetch(apiUrl, {
                method: 'PUT', // hoặc 'POST' tùy vào API
                headers: {
                    'Content-Type': 'application/json',
                    // Các headers khác nếu cần
                },
                // Body chứa dữ liệu bạn muốn truyền lên
                // Ở đây, tôi giả sử bạn muốn gửi một đối tượng JSON chứa mật khẩu mới
                body: JSON.stringify({
                    newPassword: newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Update password response:', data);

            // Xử lý dữ liệu phản hồi từ API nếu cần

            return data; // Trả về dữ liệu nếu cần
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // Ném lỗi để xử lý ở phía gọi hàm
        }
    };

    // Sử dụng hàm
    updatePasswordApi('userId123', 'newPassword123')
        .then((result) => {
            // Xử lý kết quả nếu cần
            console.log('Password updated successfully:', result);
        })
        .catch((error) => {
            // Xử lý lỗi nếu có
            console.error('Error updating password:', error);
        });


    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={5}>

                    <View style={styles.commentModal}>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', fontSize: 18 }}>Enter your password:</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Your Password"
                            secureTextEntry={true} // Set secureTextEntry to true to mask input
                            autoCapitalize="none"
                            onChangeText={text => setPass(text)}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder="Your Password"
                            secureTextEntry={true} // Set secureTextEntry to true to mask input
                            autoCapitalize="none"
                            onChangeText={text => setConPass(text)}
                        />

                        <TouchableOpacity style={{ width: 70, height: 50, backgroundColor: '#FE7104', borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }} onPress={handlePasswordChange}>Change</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    commentModal: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        width: 300,
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top',
        margin: 10,
        padding: 10,
        width: '100%',
    },

})


export default ChangePassModal;
