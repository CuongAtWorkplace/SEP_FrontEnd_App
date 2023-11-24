import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



const ReportModal = ({ closeModal }) => {

    const [ImagesEvidence, setImagesEvidence] = useState(null);


    const HandleSend = () => {
        Alert.alert("send successfully");
    }


    const openImagePicker = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {

                setImagesEvidence(result.assets[0].uri);
                // Tạo FormData để gửi dữ liệu ảnh
                const formData = new FormData();
                formData.append('file', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg', // Loại ảnh, bạn có thể điều chỉnh tùy theo định dạng ảnh
                    name: 'image.jpg', // Tên tệp trên máy chủ
                });

                if (result.assets && result.assets.length > 0) {

                }
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.commentModal}>
                    <MaterialIcons name="report-problem" size={40} color="red" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 10 }}>Report</Text>

                    <Text style={{ color: 'red', margin: 10 }}>Please calm before you sent report , we really care about you !!!</Text>

                    <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', fontSize: 18 }}>Reason</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Report Reason"
                    />
                    <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', fontSize: 18 }}>Description</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Report description"
                        numberOfLines={5}
                        multiline
                    />
                    <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', fontSize: 18 }}>Evidence Photo</Text>

                    {!ImagesEvidence && (
                        <TouchableOpacity style={{
                            width: '90%', // Set width as per your requirement
                            height: '30%', // Set height as per your requirement
                            borderRadius: '15%', // For a circular image, set borderRadius as half of width or height
                            borderWidth: 2, // Border width
                            borderColor: 'black', // Border color
                            borderStyle: 'dashed', // Border style (dashed)
                            marginTop: 10,
                            justifyContent: 'center', // Căn giữa theo chiều dọc
                            alignItems: 'center', // Căn giữa theo chiều ngang
                        }} onPress={openImagePicker}>
                            <AntDesign name="camerao" size={40} color="black" />
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}>Upload your image</Text>
                        </TouchableOpacity>
                    )}
                    {ImagesEvidence && (
                        <>
                            
                                <Image
                                    source={{ uri: ImagesEvidence }}
                                    style={{ width: 200, height: 200, borderRadius: 5, position: 'relative' }}
                                />

                        </>
                    )}

                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={HandleSend}>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20, marginTop: 5 }}>Send</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    commentModal: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top',
        margin: 10,
        padding: 10,
        width: '100%',
    }
});

export default ReportModal;
