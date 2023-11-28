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
import { useRoute } from '@react-navigation/native';


export default function registeProfile() {

    const emailInputRef = useRef();

    const route = useRoute();

    const { email, phone, password } = route.params || {};

    

    const onLoginPressed = () => {
        Alert.alert(email+" "+phone+" "+password);

        emailInputRef.current.focus();
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

            <LoginButton mode="contained" style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={onLoginPressed}>
                Finish
            </LoginButton>
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
