import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper'; // Thêm TextInput và Button vào import


import Background from '../../../component/Background';
import LoginButton from '../../../component/LoginButton';
import LottieView from 'lottie-react-native';
import { colors } from '../../../constants/theme';


export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const emailInputRef = useRef();


  const onLoginPressed = () => {
    // Xử lý logic đăng nhập ở đây

    // Sau khi xử lý logic, focus vào email input
    emailInputRef.current.focus();
  };

  return (
    <ScrollView  >
      <View >
        <LottieView
          style={{ flex: 1, width: 300, height: 300, justifyContent: 'center', alignSelf: 'center' }}
          source={require('C:/Users/ngoba/OneDrive/Máy tính/SEP_FrontEnd_App/DoAN/asset/gif/Login.json')}
          autoPlay={true}
        />
      </View>

      <TextInput
        ref={emailInputRef}
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
          // Xử lý logic khi email input được focus
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
        label="Password"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <LoginButton mode="contained" style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={onLoginPressed}>
        Login
      </LoginButton>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Sign up</Text>
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
    marginRight:15,
  },
  link: {
    fontWeight: 'bold',
    color:'#3E427B'
  },
  Input: {
    margin:15,
    backgroundColor: colors.white,
    borderWidth: 1, // Độ rộng của border
    borderColor: 'black', // Màu của border
    borderRadius: 5, // Độ cong của góc (tùy chỉnh theo mong muốn)
    height: 50,

  }
});
