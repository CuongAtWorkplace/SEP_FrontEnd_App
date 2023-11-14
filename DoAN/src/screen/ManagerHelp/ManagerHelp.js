import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HeaderBack from '../../../component/HeaderBack';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';

const ManagerHelp = ({ navigation }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [loadingText, setLoadingText] = useState('Connection Request Sent');
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        let interval;
        if (requestSent) {
            interval = setInterval(() => {
                setLoadingText((prevText) => {
                    const dots = '...'.slice(0, dotCount);
                    setDotCount((prevCount) => (prevCount % 3) + 1); // Tăng biến đếm và reset khi đạt đến 3
                    return `Connection Request Sent ${dots}`;
                });
            }, 500);
        }

        return () => clearInterval(interval);
    }, [requestSent, dotCount]);

    const sendConnectionRequest = () => {
        // Gửi yêu cầu kết nối (có thể sử dụng API hoặc thông báo)
        // Sau đó, cập nhật trạng thái yêu cầu đã được gửi
        setRequestSent(true);
    };

    const handleBack = () => {
        navigation.navigate("Home")
    };


    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <HeaderBack title='Manager_Support' action={handleBack} />
            {!requestSent ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 200, height: 200, borderRadius: 100, borderColor: 'black', borderWidth: 6, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={sendConnectionRequest}>
                        <View style={{ width: 150, height: 150 }}>
                            <LottieView
                                source={require('../ManagerHelp/sned.json')}
                                autoPlay
                                loop
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontWeight: 'bold', margin: 30 }}>Click To Start Message With Manager .</Text>
            </View>
            

            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 200, height: 200 }}>
                        <LottieView
                            source={require('../ManagerHelp/loading.json')}
                            autoPlay
                            loop
                        />
                    </View>
                    <Text style={{ fontWeight: 'bold', margin: 10 }}>{loadingText}</Text>
                </View>
            )}
        </View>
    );
};

export default ManagerHelp;
