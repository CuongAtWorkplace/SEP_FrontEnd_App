import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AllPostScreen from '../PostScreen/AllPostScreen';
import UpdateScreen from '../PostScreen/UpdateScreen';
import { StatusBar } from 'react-native';

const statusBarHeight = StatusBar.currentHeight || 0; // Lấy chiều cao của StatusBar


export default function Community({ navigation }) {

    const [isButton1Active, setIsButton1Active] = useState(true);
    const [isButton2Active, setIsButton2Active] = useState(false);
    const [isAllPostScreenVisible, setIsAllPostScreenVisible] = useState(true);
    const [isUpdatePostScreenVisible, setIsUpdatePostScreenVisible] = useState(false);



    const handleButton1Click = () => {
        setIsButton1Active(!isButton1Active);
        setIsButton2Active(false);
        setIsAllPostScreenVisible(true);
        setIsUpdatePostScreenVisible(false);
    };

    const handleButton2Click = () => {
        setIsButton2Active(!isButton2Active);
        setIsButton1Active(false);
        setIsAllPostScreenVisible(false);
        setIsUpdatePostScreenVisible(true);

    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, isButton1Active && styles.activeButton]}
                    onPress={handleButton1Click}
                >
                    <Text style={styles.buttonText}>All Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isButton2Active && styles.activeButton]}
                    onPress={handleButton2Click}
                >
                    <Text style={styles.buttonText}>Your Post</Text>
                </TouchableOpacity>
            </View>

            {isAllPostScreenVisible && !isUpdatePostScreenVisible && <AllPostScreen />}
            {isUpdatePostScreenVisible && !isAllPostScreenVisible  && <UpdateScreen />}

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: statusBarHeight + 2,
    },
    button: {
        backgroundColor: '#E5E5E5',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    activeButton: {
        backgroundColor: '#A1BAA2',
    },
    buttonText: {
        color: 'black', // Điều chỉnh màu chữ cho nút active
    },
});
