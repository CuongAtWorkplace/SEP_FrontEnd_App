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
            const response = await fetch(URL + '/api/Login/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                // Handle non-2xx response
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            onLoginPressed2();
            navigation.navigate('OnboardingScreen', { register: true });
            // Handle the response from the server
            console.log('Registration successful:', data);
            // You can navigate to the next screen or show a success message here
        } catch (error) {
            // Handle errors that occur during the API request
            console.error('Error during registration:', error);
        }
    };

    const onLoginPressed2 = async () => {
        try {
          const response = await fetch(URL + '/api/Login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Login failed');
          }
    
          // Xử lý phản hồi từ API (nếu cần)
          const result = await response.json();
          const base64Payload = result.token.split('.')[1];
    
          try {
            const decodedPayload = decode(base64Payload);
            const decodedPayloadObject = JSON.parse(decodedPayload);
    
            const userIdFromAPI = decodedPayloadObject.userid;
            const role = decodedPayloadObject.roleid;
    
            if (role != 2) {
              Alert.alert('Your account is not for student ');
              return;
            }
            else {
              dispatch(setUserId(userIdFromAPI));
              navigation.replace('Home');
            }
    
          } catch (error) {
            console.error('Error decoding payload:', error);
          }
    
          //  navigation.replace('Home')  
        } catch (error) {
          console.error('Error during login:', error);
          Alert.alert('Wrong email or password');
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



