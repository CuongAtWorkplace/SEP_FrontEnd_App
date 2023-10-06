import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from 'react-native';
import HeaderBack from '../../../component/HeaderBack';
import { colors } from '../../../constants/theme';
import myGlobalVariable from '../../global';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';

export default function Profile() {

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate("Home")
    };

    const handleUpdateProfile = () => {
        navigation.navigate('UpdateProfile')
    };

    const URL = myGlobalVariable;

    const UserID = 3;
    const [isImageLoading, setImageLoading] = useState(true);
    const [UserData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true); // Trạng thái tải dữ liệu người dùng

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(URL + '/api/User/GetStudentById/' + UserID);
                if (response.ok) {
                    const user = await response.json();
                    setUserData(user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Khi tải dữ liệu xong hoặc gặp lỗi, đặt isLoading thành false
            }
        }
        getUser();
    });

    const imageSource = { uri: URL + '/api/User/GetImage/' + UserID };


    return (
        <ScrollView style={styles.container}>
            <HeaderBack title='Profile' action={handleBack} />
            <View style={styles.imageContainer}>

                <View style={styles.imageLoading}>
                    {isImageLoading && <ActivityIndicator size="large" color={colors.primary} />}
                </View>
                <Image
                    style={styles.image}
                    source={imageSource}
                    onLoadEnd={() => setImageLoading(false)}
                />
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                    <>
                        <Text style={styles.Name}>
                            {UserData[0]?.fullName}
                        </Text>

                        <View style={styles.location}>
                            <Ionicons name="ios-location-outline" size={24} color="black" />
                            <Text>
                                {UserData[0]?.address}
                            </Text>
                        </View>

                        <View style={styles.location}>
                            <Feather name="phone" size={20} color="black" />
                            <Text>
                                {UserData[0]?.phone}
                            </Text>
                        </View>

                        <View style={styles.location}>
                            <AntDesign name="mail" size={20} color="black" />
                            <Text>
                                {UserData[0]?.email}
                            </Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => console.log('Nút Mới đã được nhấn')}>
                                <Text style={styles.buttonText}>Recharge</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BottomContainer}>
                            <View style={styles.leftContainer}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#495095' }}>10</Text>
                                <Text style={styles.classText}>Class</Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7DB246' }}>10.000 VND</Text>
                                <Text style={styles.balanceText}>Balance</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    image: {
        margin: 10,
        width: 200,
        height: 200,
        borderRadius: 20,
    },
    Name: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: 'blue',
        fontSize: 16,
    },
    location: {
        flexDirection: 'row',
        marginTop: 10,
        elevation: 5,
    },
    BottomContainer: {
        marginTop: 20,
        height: 100,
        width: 350,
        borderRadius: 30,
        backgroundColor: '#D8D7D7',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between', // Canh giữa theo chiều ngang
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 60,
    },
    rightContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 60,
    },
    classText: {
        fontSize: 16,
    },
    balanceText: {
        fontSize: 16,
    },
});
