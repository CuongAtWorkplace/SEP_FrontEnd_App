import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { colors } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { ref, set, push, onChildAdded, off } from "firebase/database"
import { db } from "../../../component/config";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import HeaderBack from "../../../component/HeaderBack";
import User from '../../user';
import { Ionicons } from '@expo/vector-icons';
import myGlobalVariable from "../../global";
import format from "date-fns/format";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useRef } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";
import * as ImagePicker from 'expo-image-picker';


export default function Chat() {
    const navigation = useNavigation();
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true); // Thêm trạng thái disable cho nút gửi
    const route = useRoute();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isImageLoading, setIsImageLoading] = React.useState(true);
    const [connection, setConnection] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageLoading2, setIsImageLoading2] = useState(false);
    const [CheckImageLoading, SetCheckIsImageLoading] = useState(false);



    const scrollViewRef = useRef();
    const URL = myGlobalVariable;

    const courseId = route.params.id;

    const className = route.params.name;
    const handleHeader = () => {
        navigation.navigate('ClassDetail', { classId: courseId });
    };

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    const handleCancelImage = () => {
        setSelectedImage("");
        SetCheckIsImageLoading(false);
    };


    const handleSend = () => {
        // If there's a selected image, upload it first
        if (selectedImage) {
            uploadImage();
        } else {
            sendMessage("");
        }
    };

    const uploadImage = async () => {
        try {
            const formData = new FormData();

            const imageFile = {
                uri: selectedImage,
                type: 'image/jpeg',
                name: 'image.jpg',
            };

            formData.append('file', imageFile);

            const uploadResponse = await fetch(URL + '/api/Post/UploadImage', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (uploadResponse.ok) {
                const responseJson = await uploadResponse.text();
                sendMessage(responseJson);
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image');
        }
    };

    const sendMessage = (imageURL) => {
        const messageToSend = newMessage;

        setNewMessage("");
        setSelectedImage("");
        SetCheckIsImageLoading(false);
        setIsSendButtonDisabled(true);

        fetch(URL + '/api/ChatRoom/AddMessage/' + courseId + '/' + User, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: messageToSend,
                photo: imageURL // If imageURL is empty, it will be set as an empty string for no image
            }),
        })
            .then(response => {
                if (response.ok) {
                    Alert.alert('Message sent successfully');
                    // Optionally, you can handle the successful response here
                } else {
                    Alert.alert('Failed to send message');
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                Alert.alert('Error sending message');
            });
    };



    // Establish the connection
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(URL + '/chatHub')
            .build();

        setConnection(newConnection);

        newConnection
            .start()
            .then(() => {
                console.log('Connected to SignalR Hub');
                newConnection.on('ReceiveMessage', (message) => {
                    setMessages(prevMessages => [...prevMessages, message]);
                });
            })
            .catch((error) => console.log('Error connecting to SignalR Hub: ' + error));

        return () => {
            // Cleanup function to close the event listener
            if (newConnection) {
                newConnection.off('ReceiveMessage');
            }
        };
    }, []); // Run only once when the component mounts

    // Handle disconnection
    useEffect(() => {
        return () => {
            // Close the connection when the component unmounts
            if (connection) {
                connection.stop();
            }
        };
    }, [connection]); // Run whenever the connection state changes

    // Further logic within your component
    // ...


    useEffect(() => {
        fetch(URL + "/api/ChatRoom/GetAllClassMessages/" + courseId)
            .then(response => response.json())
            .then(data => {
                console.log(courseId);
                setMessages(data);
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            })
            .finally(() => {
                setNewMessage("");
                setIsSendButtonDisabled(true);
                setIsLoading(false); // Tắt tình trạng isLoading khi dữ liệu đã được nạp

                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollToEnd({ animated: false });
                }
            });
    }, []);

    useEffect(() => {
        // Fetch messages and set them in the state as you currently do

        // After setting messages, scroll to the end
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]); // Scroll when messages change

    // Scroll to the end immediately
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false });
        }
    }, []);

    const handleDelete = (messageId) => {
        Alert.alert(
            'Xác nhận xóa tin nhắn',
            'Bạn có chắc muốn xóa tin nhắn này?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        fetch(URL + `/api/ChatRoom/DeleteMessage/${messageId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    Alert.alert('Tin nhắn đã được xóa thành công');
                                    setMessages(prevMessages => prevMessages.filter(message => message.messageId !== messageId));
                                } else {
                                    Alert.alert('Xóa tin nhắn thất bại');
                                }
                            })
                            .catch(error => {
                                console.error('Lỗi khi xóa tin nhắn:', error);
                                Alert.alert('Lỗi khi xóa tin nhắn');
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };


    const openImagePicker = async () => {



        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        SetCheckIsImageLoading(true);
        setIsImageLoading2(true);

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {

                setSelectedImage(result.assets[0].uri);
                // Tạo FormData để gửi dữ liệu ảnh
                const formData = new FormData();
                formData.append('file', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg', // Loại ảnh, bạn có thể điều chỉnh tùy theo định dạng ảnh
                    name: 'image.jpg', // Tên tệp trên máy chủ
                });
                if (result.assets && result.assets.length > 0) {
                }
            }
        }

    }



    return (
        <View style={styles.container}>
            {isLoading && isImageLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <React.Fragment>
                    <HeaderBack title={`Group Chat : ${className}`} action={handleHeader} />
                    <ImageBackground
                        source={{ uri: 'https://wallpapers.com/images/hd/whatsapp-chat-doodle-patterns-jyd5uvep2fdwjl97.jpg' }}
                        style={styles.backgroundImage}
                    >
                        <View style={styles.chatContainer}>
                            <ScrollView
                                ref={scrollViewRef}
                                onContentSizeChange={(contentWidth, contentHeight) => {
                                    scrollViewRef.current.scrollToEnd({ animated: false });
                                }}
                            >

                                {messages.map((message, index) => (
                                    <View key={index} style={{ alignSelf: message.createBy === User ? 'flex-end' : 'flex-start' }}>
                                        <Text style={{ fontSize: 12, color: 'black' }}>
                                            {message.fullName}
                                        </Text>

                                        <View style={{ flexDirection: "row" }}>
                                            {message.createBy === User && (
                                                <TouchableOpacity style={{ margin: 8 }} onPress={() => handleDelete(message.messageId)}>
                                                    <Ionicons name="trash-bin-outline" size={24} color="black" />
                                                </TouchableOpacity>
                                            )}
                                            <Text style={{
                                                borderRadius: 20,
                                                width: 150,
                                                backgroundColor: message.createBy === User ? 'lightblue' : message.roleId === 1 ? '#C79191' : 'lightgray',
                                                padding: 8,
                                                margin: 4
                                            }}>
                                                {message.content}
                                            </Text>

                                        </View>


                                        {message.photo && (
                                            <View>
                                                <Image
                                                    source={{ uri: URL + '/api/ChatRoom/GetImage/' + message.messageId }}
                                                    style={{
                                                        width: 150,
                                                        height: 150,
                                                        borderRadius: 20,
                                                        margin: 4,
                                                    }}
                                                    onLoad={handleImageLoad}
                                                />

                                            </View>
                                        )}

                                        <Text style={{ fontSize: 12, color: 'gray' }}>
                                            {message.createDate}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        {CheckImageLoading && (
                            <View style={{ position: 'absolute', bottom: 60, left: 10 }}>
                                {isImageLoading2 && (
                                    <ActivityIndicator size="small" color="white" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                                )}

                                <View style={{ position: 'absolute', top: -10, right: -10, zIndex: 1 }}>
                                    <TouchableOpacity onPress={handleCancelImage}>
                                        <Ionicons name="close-circle" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{ width: 50, height: 50, borderRadius: 5, position: 'relative' }}
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>


                            <TouchableOpacity onPress={openImagePicker} >
                                <Ionicons name="attach" size={35} color="white" />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.input}
                                placeholder="Type a message..."
                                placeholderTextColor={colors.white}
                                value={newMessage}
                                onChangeText={text => {
                                    setNewMessage(text);
                                    setIsSendButtonDisabled(text.trim().length === 0); // Update the disabled state based on the trimmed text
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    margin: 10,
                                }}
                                disabled={isSendButtonDisabled}
                                onPress={isSendButtonDisabled ? null : handleSend} >
                                {/* Disable onPress if isSendButtonDisabled is true */}
                                <Ionicons name="send-outline" size={25} color={!isSendButtonDisabled ? "white" : "gray"} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </React.Fragment>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        height: 40,
        borderColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 8,
        color: colors.white,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});
