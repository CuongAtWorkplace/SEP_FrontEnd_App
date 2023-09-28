import React, { useState } from 'react';
import { View } from 'react-native';
import SettingItem from '../../../component/SettingItem';

export default function setting({ navigation }) {

    return (
        <View>
            <SettingItem text="Profile" iconName="home" />
            <SettingItem text="Help" iconName="contacts" />
            <SettingItem text="Logout" iconName="logout" />

        </View>
    )
}