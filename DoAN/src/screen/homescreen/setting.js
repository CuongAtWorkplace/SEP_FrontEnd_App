import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import SettingItem from '../../../component/SettingItem';
import { useNavigation } from '@react-navigation/native';
import { resetUserId } from '../../userSlice.js';
import { useDispatch } from 'react-redux';

export default function setting() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleProfile = () => {
        navigation.navigate('Profile')
    };
    const handleLogout = () => {
        dispatch(resetUserId());
        navigation.navigate('Login')
    };

    const OnboardingScreen = () => {
        navigation.navigate('OnboardingScreen', { register: false });

    };

    const ManagerHelpScreen = () => {
        navigation.navigate('ManagerHelp')
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.setting}>
                Settings
            </Text>
            <View style={styles.option}>
                <SettingItem text="Profile" iconName="user" action={handleProfile} />
                <SettingItem text="Help with manager" iconName="contacts" action={ManagerHelpScreen} />
                <SettingItem text="About us" iconName="profile" action={OnboardingScreen} />
                <SettingItem text="Logout" iconName="logout" action={handleLogout} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    setting: {
        fontWeight: "bold",
        fontSize: 50,
        textAlign: 'center', // Canh giữa theo chiều ngang
    },
    option: {
        marginTop: 30,
    }
});
