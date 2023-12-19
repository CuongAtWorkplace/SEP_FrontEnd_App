import React from "react"
import { AntDesign } from '@expo/vector-icons';
import { Alert, StyleSheet } from "react-native";
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useRef } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useState } from "react";
import myGlobalVariable from "../../global";


const ForgetPaswordModal = ({ closeModal, sendModal, email, setEmail }) => {

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
                sendModal();
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error("Error sending email:", error);
            });
    };

    const checkEmailExistence = () => {
        // Call your API to check if the email exists
        fetch(`${URL}/api/Login/CheckLearnerEmail/api/CheckLearnerEmail?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.status == 400) {
                    Alert.alert("Your email is not available");
                    return;
                }
                if (response.status == 200) {
                    handleSend();
                }
            })

            .catch(error => {
                // Handle any other errors
                console.error("Error checking email existence:", error);
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
                            <Text style={{ fontWeight: 'bold', color: 'white' }} onPress={checkEmailExistence}>Send</Text>
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
