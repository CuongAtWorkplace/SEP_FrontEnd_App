import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SettingItem from '../../../component/SettingItem';
import { useNavigation } from '@react-navigation/native';

export default function setting() {

    const navigation = useNavigation();

    const handleProfile = () => {
        navigation.navigate('Profile')
    };
    const handleLogout = () => {
        navigation.navigate('Login')
    };

   

    return (
        <View>
            <Text style={styles.setting}>
                Settings
            </Text>

            <SettingItem text="Profile" iconName="user" action={handleProfile} />
            <SettingItem text="Help with manager" iconName="contacts"  />
            <SettingItem text="About us" iconName="profile" />
            <SettingItem text="Logout" iconName="logout" action={handleLogout}/>

        </View>
    )
}

const styles = StyleSheet.create({
    setting: {
        fontWeight: "bold",
        fontSize: 50,
        margin: 30
    }
});
