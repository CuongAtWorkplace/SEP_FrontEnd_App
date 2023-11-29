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

    const URL = myGlobalVariable ;

    const [fileList, setFileList] = useState([]);

    const fetchFiles = async () => {
        try {
          const response = await fetch(URL+"/api/File/GetAllFiles?classId="+courseId);
          const data = await response.json();
          setFileList(data);
        } catch (error) {
          console.error('Error fetching files:', error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchFiles();
      }, []); // Empty dependency array means this effect runs once when the component mounts
    


    const handleHeader = () => {
        navigation.navigate('ClassDetail', { classId: courseId });
    };

    const handleFilePress =(name) =>{
        Linking.openURL(URL+"/api/File/GetFileByNameInWeb?fileName="+name);
    }

    return (
        <View>
            <HeaderBack title={`Group File : ${className}`} action={handleHeader} />

            <FlatList
                style={styles.fileStyle}
                data={fileList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleFilePress(item.fileName)}>
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
