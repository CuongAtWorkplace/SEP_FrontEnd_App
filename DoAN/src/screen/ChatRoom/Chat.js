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


export default function Chat() {
    const navigation = useNavigation();
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true); // Thêm trạng thái disable cho nút gửi
    const route = useRoute();
    const [isLoading, setIsLoading] = React.useState(true);
    const URL = myGlobalVariable;

    const courseId = route.params.id;
    const handleHeader = () => {
        navigation.navigate('ClassDetail', { classId: courseId });

    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleSend = () => {
        Alert.alert(newMessage);
        setNewMessage("");

    };

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
                setIsLoading(false);
            });
    }, []);


    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <React.Fragment>
                    <HeaderBack title="Group chat" action={handleHeader} />
                    <ImageBackground
                        source={{ uri: 'https://wallpapers.com/images/hd/whatsapp-chat-doodle-patterns-jyd5uvep2fdwjl97.jpg' }}
                        style={styles.backgroundImage}
                    >
                        <View style={styles.chatContainer}>
                            <ScrollView>
                                {messages.map((message, index) => (
                                    <View key={index} style={{ alignSelf: message.createBy === User ? 'flex-end' : 'flex-start' }}>
                                        <Text style={{ fontSize: 12, color: 'black' }}>
                                            {message.fullName}
                                        </Text>

                                        <View style={{ flexDirection: "row" }}>
                                            {message.createBy === User && (
                                                <Ionicons style={{ margin: 8 }} name="trash-bin-outline" size={24} color="black" />
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
                                                {isLoading && (
                                                    <ActivityIndicator size="large" color="gray" />
                                                )}
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
                                            {format(new Date(message.createDate), 'HH:mm:ss dd/MM/yyyy')}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity >
                                <Ionicons name="attach" size={35} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Type a message..."
                                placeholderTextColor={colors.white}
                                value={newMessage}
                                onChangeText={text => {
                                    setNewMessage(text);
                                    setIsSendButtonDisabled(text.length === 0); // Cập nhật trạng thái disable
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    margin: 10,

                                }}
                                disabled={isSendButtonDisabled}
                                onPress={handleSend} >
                                <FontAwesome
                                    name="send"
                                    size={25}
                                    color={newMessage ? "white" : "gray"} // Màu biểu tượng tùy theo newMessage
                                />
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
