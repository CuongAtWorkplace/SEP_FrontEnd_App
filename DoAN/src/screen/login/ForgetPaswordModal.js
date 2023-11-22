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


const ForgetPaswordModal = ({ closeModal }) => {

    const [email, setEmail] = useState("");
    const URL = myGlobalVariable;

    const handleSend = () => {
        // Gửi yêu cầu POST đến API
        fetch(URL + "/api/Email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                To: email,
                Subject: "Forgot Password",
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                // Xử lý dữ liệu phản hồi từ API nếu cần
                console.log(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error("Error sending email:", error);
            });
    };


    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={5}>

                    <View style={styles.commentModal}>
                        <View style={{ width: 200, height: 200 }}>
                            <LottieView
                                source={require('../login/email.json')}
                                autoPlay
                                loop
                            />
                        </View>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', fontSize: 18 }}>Type your email here:</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            numberOfLines={5}
                            multiline
                            onChangeText={text => setEmail(text)}
                        />


                        <TouchableOpacity style={{ width: 70, height: 50, backgroundColor: '#FE7104', borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }} onPress={handleSend}>Send</Text>
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

export default ForgetPaswordModal;
