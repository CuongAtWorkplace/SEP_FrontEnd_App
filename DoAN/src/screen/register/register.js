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

export default function register({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const [ConPassword, setConPassword] = useState({ value: '', error: '' });


    const emailInputRef = useRef();

    const checkPasswordMatch = () => {
        if (password.value !== ConPassword.value) {
            Alert.alert("Please check your password");

            return false;
        }
        return true;
    };



    const onLoginPressed = () => {
        if (checkPasswordMatch()) {
            navigation.navigate('registeProfile', { email: email.value, phone: phone.value, password: password.value });
        }
    };

    return (
        <ScrollView style={{ backgroundColor: 'white', height: '100%' }} >
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={5}>
                <View style={{ marginBottom: 10, marginTop: 100 }}>
                    <LottieView
                        style={{ flex: 1, width: 200, height: 200, justifyContent: 'center', alignSelf: 'center' }}
                        source={require('../../assets/register.json')}
                        autoPlay
                        loop
                    />
                </View>

                <TextInput
                    style={styles.Input}
                    label="Email"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
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
                    style={styles.Input}
                    label="Phone"
                    value={phone.value}
                    onChangeText={(text) => setPhone({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
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
                    style={styles.Input}
                    label="Password"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCompleteType="password"
                    textContentType="password"
                    keyboardType="default"
                    underlineColor="#3E427B"
                    right={<TextInput.Icon name="eye" />}
                />


                <TextInput
                    style={styles.Input}
                    label="Confirm your Password"
                    value={ConPassword.value}
                    onChangeText={(text) => setConPassword({ value: text, error: '' })}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCompleteType="password"
                    textContentType="password"
                    keyboardType="default"
                    underlineColor="#3E427B"
                    right={<TextInput.Icon name="eye" />}
                />

            </KeyboardAvoidingView>
            <LoginButton mode="contained" style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={onLoginPressed}>
                Register
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
