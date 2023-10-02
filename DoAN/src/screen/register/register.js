import React, { useState , useRef} from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { StyleSheet , TextInput} from 'react-native';
import { colors } from '../../../constants/theme';

export default function register() {

    const [email, setEmail] = useState({ value: '', error: '' });


    const emailInputRef = useRef();


    return (
        <View >
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
        </View>
    )
}

const styles = StyleSheet.create({
    Input: {
      margin:15,
      backgroundColor: colors.white,
      borderWidth: 1, // Độ rộng của border
      borderColor: 'black', // Màu của border
      borderRadius: 5, // Độ cong của góc (tùy chỉnh theo mong muốn)
      height: 50,

    }
  });
  