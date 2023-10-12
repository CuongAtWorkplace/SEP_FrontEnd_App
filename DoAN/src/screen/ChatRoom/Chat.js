import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
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

export default function Chat() {
    const navigation = useNavigation();
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");
    const route = useRoute();
    const [isLoading, setIsLoading] = React.useState(true);

    const courseId = route.params.id;
    const handleHeader = () => {
        navigation.navigate('Home');
        console.log(courseId + ' ' + User);
    };

    const handleSendMessage = () => {
        // Thêm tin nhắn vào Firebase Realtime Database
        const messageData = {
            userId: User,
            text: newMessage,
            timestamp: new Date().toLocaleString(), // Lưu ngày và giờ dưới dạng chuỗi định dạng cụ thể
        };
        const messagesRef = ref(db, 'chatGroups', courseId, 'messages');
        push(messagesRef, messageData);

        // Xóa nội dung tin nhắn sau khi gửi
        setNewMessage('');
    };

    useEffect(() => {
        const messagesRef = ref(db, 'chatGroups', courseId, 'messages');

        const handleMessageAdded = (snapshot) => {
            const message = snapshot.val();
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        onChildAdded(messagesRef, handleMessageAdded);

        setIsLoading(false);

        return () => {
            // Remove the event listener when the component unmounts
            // This is important to prevent memory leaks
            off(messagesRef, 'child_added', handleMessageAdded);
        };
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
                                    <View key={index} style={{ alignSelf: message.userId === User ? 'flex-end' : 'flex-start' }}>
                                        <Text style={{ borderRadius: 20, width: 150, backgroundColor: message.userId === User ? 'lightblue' : 'lightgray', padding: 8, margin: 4 }}>
                                            {message.text}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: 'gray' }}>
                                            {message.timestamp}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={{ marginLeft: 20 }}>
                                <View style={{ backgroundColor: colors.black, width: 30, height: 30 }}>
                                    <Ionicons name="attach" size={30} color="white" />
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Type a message..."
                                placeholderTextColor={colors.white}
                                value={newMessage}
                                onChangeText={text => setNewMessage(text)}
                            />
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={handleSendMessage}>
                                <View style={{ backgroundColor: colors.black, width: 30, height: 30 }}>
                                    <FontAwesome name="send" size={24} color="white" />
                                </View>
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
        marginLeft: 15,
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
