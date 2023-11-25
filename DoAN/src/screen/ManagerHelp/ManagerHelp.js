import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HeaderBack from '../../../component/HeaderBack';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import myGlobalVariable from '../../global';
import { Alert } from 'react-native';

const ManagerHelp = ({ navigation }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [loadingText, setLoadingText] = useState('Connection Request Sent');
    const [dotCount, setDotCount] = useState(1);
    const URL = myGlobalVariable;

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
        createChatRoom();
        setRequestSent(true);
    };


    const createChatRoom = async () => {
    try {
        const response = await fetch(URL + '/api/RequestManager/CreateChatRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatRoomName: 'New Chat Room',
                description: 'Description of the chat room',
                isManagerChat: false,
                classId: 0,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            Alert.alert('Success', `Chat room created with ID: ${data}`);

            // Gọi hàm checkManagerChatRoom mỗi 10 giây
            const intervalId = setInterval(() => {
                checkManagerChatRoom(data);
            }, 10000);

            // Dừng việc kiểm tra sau 60 giây
            setTimeout(() => {
                clearInterval(intervalId);
            }, 60000);

        } else {
            const errorData = await response.json();
            Alert.alert('Error', `Failed to create chat room: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error calling createchatroom API:', error.message);
    }
};

const checkManagerChatRoom = async (classId) => {
    try {
        const response = await fetch(`${URL}/api/RequestManager/CheckManagerChatRoom/CheckManagerChatRoom/${classId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const isManagerChatRoomExist = await response.json();
            if (isManagerChatRoomExist) {
                Alert.alert('Alert', 'oke luôn');
            } else {
                // Tiếp tục xử lý theo ý của bạn
            }
        } else {
            const errorData = await response.json();
            Alert.alert('Error', `Failed to check manager chat room: ${errorData.message}`);
        }
    } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred');
    }
};

    // Gọi hàm để kiểm tra mỗi 10 giây



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
