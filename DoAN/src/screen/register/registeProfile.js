import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper'; // Thêm TextInput và Button vào impor
import Background from '../../../component/Background';
import LoginButton from '../../../component/LoginButton';
import LottieView from 'lottie-react-native';
import { colors } from '../../../constants/theme';
import Video from 'react-native-video';
import { KeyboardAvoidingView } from 'react-native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import myGlobalVariable from '../../global';
import { useDispatch } from 'react-redux';


export default function registeProfile() {

    const emailInputRef = useRef();

    const URL = myGlobalVariable;
    const route = useRoute();

    const { email, phone, password } = route.params || {};

    const dispatch = useDispatch();


    const navigation = useNavigation();
    const [fullname, setFullname] = useState({ value: '', error: '' });
    const [address, setAddress] = useState({ value: '', error: '' });
    const [description, setDescription] = useState({ value: '', error: '' });



    function validateLocationString(inputString) {
        // Biểu thức chính quy để kiểm tra tên thành phố và tên đất nước của Việt Nam
        const regex = /^[^\d,]+.\s*Việt Nam$/;
        return regex.test(inputString);
    }

    function validateFullName(fullName) {
        // Regular expression for a full name without special characters
        const fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ']+([ A-Za-zÀ-ÖØ-öø-ÿ']+)*$/;

        return fullNameRegex.test(fullName);
    };


    function Test() {
        let isValid = true; // Biến để kiểm tra xem tất cả đều hợp lệ
        let noti = '';
        if (!validateFullName(fullname.value)) {
            isValid = false;
            noti = noti + "Fullname Format . "
        }
        
        if (!validateLocationString(address.value)) {
            isValid = false;
            noti = noti + "Location Format . "
        }

       


        if (isValid) {
            Alert.alert('Notification', 'Your account has created successfully');
            onLoginPressed();
        } else {
            Alert.alert('Error', 'Wrong ' + noti);
        }
    }





    const onLoginPressed = async () => {
        // Prepare the data to be sent to the API
        const userData = {
            email: email,
            password: password,
            fullname: fullname.value,
            phone: phone,
            address: address.value,
            description: description.value
        };

        // Alert.alert(email + " " + password + " " + fullname.value + " " + phone + " " + address.value + " " + description.value);

        try {
            // Make the API request
            const response = await fetch(URL + '/api/Login/Resigter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                // Handle non-2xx response
                const errorData = await response.json(); // Parse JSON response
                Alert.alert(errorData.message); // Access the 'message' property
                throw new Error(`HTTP error! Status: ${response.message}`);
            }

            const data = await response.json();
            navigation.navigate('OnboardingScreen', { register: true });
            // Handle the response from the server
            console.log('Registration successful:', data);
            // You can navigate to the next screen or show a success message here
        } catch (error) {
            // Handle errors that occur during the API request
            console.error('Error during registration:', error);
        }
    };



    return (
        <ScrollView style={{ backgroundColor: 'white', height: '100%' }} >
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={5}>
                <View style={{ marginBottom: 10, marginTop: 100 }}>
                    <LottieView
                        style={{ flex: 1, width: 200, height: 200, justifyContent: 'center', alignSelf: 'center' }}
                        source={require('./profile.json')}
                        autoPlay
                        loop
                    />
                </View>

                <TextInput
                    ref={emailInputRef}
                    style={styles.Input}
                    label="Fullname"
                    value={fullname.value}
                    onChangeText={(text) => setFullname({ value: text, error: '' })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onFocus={() => {
                    }}
                    labelStyle={{
                        color: colors.gray, // Màu của label
                        marginBottom: 8, // Khoảng cách giữa label và input
                    }}
                    underlineColor="#3E427B" // Màu của đường outline bên dưới
                />

                <TextInput
                    ref={emailInputRef}
                    style={styles.Input}
                    label="Address"
                    value={address.value}
                    onChangeText={(text) => setAddress({ value: text, error: '' })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onFocus={() => {
                    }}
                    labelStyle={{
                        color: colors.gray, // Màu của label
                        marginBottom: 8, // Khoảng cách giữa label và input
                    }}
                    underlineColor="#3E427B" // Màu của đường outline bên dưới
                />


                <TextInput
                    ref={emailInputRef}
                    style={styles.Input}
                    label="Description"
                    value={description.value}
                    onChangeText={(text) => setDescription({ value: text, error: '' })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onFocus={() => {
                        // Xử lý logic khi email input được focus
                    }}
                    labelStyle={{
                        color: colors.gray, // Màu của label
                        marginBottom: 8, // Khoảng cách giữa label và input
                    }}
                    underlineColor="#3E427B" // Màu của đường outline bên dưới
                />
            </KeyboardAvoidingView>

            <LoginButton mode="contained" style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={Test}>
                Finish
            </LoginButton>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        marginRight: 15,
    },
    link: {
        fontWeight: 'bold',
        color: '#3E427B'
    },
    Input: {
        margin: 15,
        backgroundColor: colors.white,
        borderWidth: 1, // Độ rộng của border
        borderColor: 'black', // Màu của border
        borderRadius: 5, // Độ cong của góc (tùy chỉnh theo mong muốn)
        height: 50,

    }
});



