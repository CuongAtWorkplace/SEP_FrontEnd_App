import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import {ref , set} from "firebase/database"
import { db } from "../../../component/config";


import HeaderBack from "../../../component/HeaderBack";

export default function Chat() {
    const navigation = useNavigation();
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");

    const handleHeader = () => {
        navigation.navigate('Home');
    };

    const handleSendMessage = () => {
        set(ref(db,'users'+3),{
            username : 'Cuong',
            mail:'aaaaa',
        })
        .then(() => {
            alert('ok');
            console.log('ok');
        })
        .catch((error) =>{
            alert(error);
            console.log('fail');

        });
    };

    return (
        <View style={styles.container}>
            <HeaderBack title="Group chat" action={handleHeader} />
            <ImageBackground
                source={{ uri: 'https://wallpapers.com/images/hd/whatsapp-chat-doodle-patterns-jyd5uvep2fdwjl97.jpg' }}
                style={styles.backgroundImage}
            >
                <View style={styles.chatContainer}>

                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <View style={styles.message}>
                                <Text>{item.user}: {item.text}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>


                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.white}
                        value={newMessage}
                        onChangeText={text => setNewMessage(text)}
                    />
        
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={handleSendMessage}>
                        <View style={{backgroundColor:colors.black , width:30 , height:30}}>
                        <FontAwesome name="send" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: colors.primary, // Thay đổi màu sắc theo ứng dụng của bạn
    },
    title: {
        fontSize: 20,
        color: "white",
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    message: {
        marginBottom: 8,
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
        borderColor: colors.white, // Thay đổi màu sắc theo ứng dụng của bạn
        borderRadius: 20,
        paddingHorizontal: 8,
        color: colors.white,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Điều này sẽ làm cho ảnh nền bao phủ toàn bộ phần nội dung
    },
});