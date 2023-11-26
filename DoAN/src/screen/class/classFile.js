import React from 'react';
import { Image, Text, ScrollView, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import myGlobalVariable from '../../global';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressDialog from 'react-native-progress-dialog';
import { Linking } from 'react-native';
import { Modal } from 'react-native';
import ReportModal from './ReportModal';
import FeedBackModal from './FeedBackModal';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import HeaderBack from '../../../component/HeaderBack';
import { FlatList } from 'react-native';


export default function classFile() {


    const route = useRoute();
    const courseId = route.params.id;
    const className = route.params.name;
    const navigation = useNavigation();

    const fileList = [
        { fileId: 1, fileName: 'File1.pdf', fileUrl: 'https://www.marxists.org/archive/marx/works/download/pdf/Capital-Volume-I.pdf' },
        { fileId: 2, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 3, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 4, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 5, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 6, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 7, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 8, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },
        { fileId: 9, fileName: 'File2.pdf', fileUrl: 'https://example.com/file2.pdf' },

    ];


    const handleHeader = () => {
        navigation.navigate('ClassDetail', { classId: courseId });
    };

    const handleFilePress =(URL) =>{
        Linking.openURL(URL);
    }

    return (
        <View>
            <HeaderBack title={`Group File : ${className}`} action={handleHeader} />

            <FlatList
                style={styles.fileStyle}
                data={fileList}
                keyExtractor={(item) => item.fileId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleFilePress(item.fileUrl)}>
                        <View style={styles.fileItem}>
                            <FontAwesome5 name="file-alt" size={24} color={colors.primary} />
                            <Text style={styles.fileName}>{item.fileName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderColor: colors.lightGray,
        backgroundColor:'white',
        margin:7,
        marginLeft:20,
        marginRight:20,
        borderRadius:20,
    },
    fileName: {
        marginLeft: 16,
        fontSize: sizes.body,
        color: colors.black,
    },
    fileStyle:{
        marginTop:20,
    }
});
