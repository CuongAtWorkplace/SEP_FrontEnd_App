import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
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
import User from '../../user';
import { useSelector } from 'react-redux';


export default function chargeScreen() {

    const navigation = useNavigation();


    const URL = myGlobalVariable ;
    const handleBack = () => {
        navigation.navigate("Home")
    };


    return (
        <View style={{backgroundColor:'white' , width:'100%'}}>
            <HeaderBack title='Charge your payment' action={handleBack} />
            <View style={{ flex:1 , alignItems:'center' }}>
            <Image
                source={{ uri: URL+'/api/Course/Getqr/Getqr' }}
                style={{ width: 300, height: 600, borderRadius: 5, position: 'relative' }}
            />
            </View>
        </View>
    );
}


