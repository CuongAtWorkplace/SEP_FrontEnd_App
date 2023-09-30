import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HeaderBack from '../../../component/HeaderBack';
import { colors } from '../../../constants/theme';

export default function Profile() {

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Setting')
    };

    const handleUpdateProfile = () => {
        navigation.navigate('UpdateProfile')
    };


    return (
        <ScrollView style={styles.container}>
            <HeaderBack title='Profile' action={handleBack} />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            'https://i0.wp.com/scottbarrykaufman.com/wp-content/uploads/2023/06/Ken-Wilber.png?fit=1280%2C720&ssl=1',
                    }}
                />

                <Text style={styles.Name}>
                    Ken wilber
                </Text>

                <View style={styles.location}>
                <Ionicons name="ios-location-outline" size={24} color="black" />                    <Text> Hanoi , VietNam</Text>
                </View>

                <View style={styles.location}>
                    <Feather name="phone" size={20} color="black" />
                    <Text>  0964918288 </Text>
                </View>

                <View style={styles.location}>
                    <AntDesign name="mail" size={20} color="black" />
                    <Text> Ngobacuong2211@gmail.com</Text>
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
