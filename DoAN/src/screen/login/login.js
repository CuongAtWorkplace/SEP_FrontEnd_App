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
import { KeyboardAvoidingView } from 'react-native';
import myGlobalVariable from '../../global';
import { jwtDecode } from 'jwt-decode';
import { decode } from 'base-64';
import { Alert } from 'react-native';
import IconButton from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../userSlice.js';
import CodeVerifyModal from './CodeVerifyModal.js';
import ChangePassModal from './ChangePassModal.js';


export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isCodeVerifyModalVisible, setCodeVerifyModalVisible] = useState(false);
  const [isChangePassVisible, setChangePassVisible] = useState(false);

  const [emailSend, setEmailSend] = useState("");



  const URL = myGlobalVariable;
  const emailInputRef = useRef();
  const dispatch = useDispatch();



  const onLoginPressed = async () => {
    try {
      const response = await fetch(URL + '/api/Login/AuthenticateLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
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



  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCancelforget = () => {
    setIsPassVisible(false);
    setCodeVerifyModalVisible(false);
    setChangePassVisible(false);
  };

  const handleForgetPass = () => {
    setIsPassVisible(true);
  };

  const handleSend = () => {
    setIsPassVisible(false);
    setCodeVerifyModalVisible(true);
  };

  const handleCode = () => {
    setIsPassVisible(false);
    setCodeVerifyModalVisible(false);
    setChangePassVisible(true);
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
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={5}>
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
          style={styles.Input}
          label="Password"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          secureTextEntry={passwordVisible}
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          keyboardType="default"
          underlineColor="#3E427B"
          right={<TextInput.Icon name="eye" />}
        />

      </KeyboardAvoidingView>
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
          <ForgetPaswordModal closeModal={handleCancelforget} sendModal={handleSend} email={emailSend} setEmail={setEmailSend} />
        </Modal>

        <Modal
          transparent={true}
          animationType='fade'
          visible={isCodeVerifyModalVisible}
          onRequestClose={() => setCodeVerifyModalVisible(false)}
        >
          <CodeVerifyModal closeModal={handleCancelforget} sendModal={handleCode} email={emailSend} />
        </Modal>

        <Modal
          transparent={true}
          animationType='fade'
          visible={isChangePassVisible}
          onRequestClose={() => setCodeVerifyModalVisible(false)}
        >
          <ChangePassModal closeModal={handleCancelforget} email={emailSend} />
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