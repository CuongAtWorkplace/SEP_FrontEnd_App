import React, { useState } from 'react';
import { View, StyleSheet ,Text } from 'react-native';
import SettingItem from '../../../component/SettingItem';

export default function setting({ navigation }) {

    return (
        <View>
            <Text style={styles.setting}>
                Settings
            </Text>

            <SettingItem text="Profile" iconName="user" />
            <SettingItem text="Help with manager" iconName="contacts" />
            <SettingItem text="About us" iconName="profile" />
            <SettingItem text="Logout" iconName="logout" />

        </View>
    )
}

const styles = StyleSheet.create({
    setting:{
        fontWeight:"bold",
        fontSize: 50,
        margin:30
    }
  });
  