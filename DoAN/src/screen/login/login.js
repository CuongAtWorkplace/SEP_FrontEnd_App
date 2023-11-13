import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper'; // Thêm TextInput và Button vào impor
import Background from '../../../component/Background';
import LoginButton from '../../../component/LoginButton';
import LottieView from 'lottie-react-native';
import { colors } from '../../../constants/theme';
import { SafeAreaView } from 'react-native';
import { Modal } from 'react-native';
import ForgetPaswordModal from './ForgetPaswordModal';
export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isPassVisible, setIsPassVisible] = useState(false);

  const emailInputRef = useRef();


  const onLoginPressed = () => {
    emailInputRef.current.focus();
  };


  const handleCancelforget = () => {
    setIsPassVisible(false);
  };

  const handleForgetPass = () => {
    setIsPassVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }} >
      <View style={{ marginBottom: 50, marginTop: 100 }}>
        <LottieView
          style={{ flex: 1, width: 200, height: 200, justifyContent: 'center', alignSelf: 'center' }}
          source={require('../../assets/login.json')}
          autoPlay
          loop
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
        <TouchableOpacity onPress={handleForgetPass}>
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


      <SafeAreaView>
        <Modal
          transparent={true}
          animationType='fade'
          visible={isPassVisible}
          onRequestClose={handleCancelforget}>
          <ForgetPaswordModal closeModal={handleCancelforget} />
        </Modal>

      </SafeAreaView>


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
