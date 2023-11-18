import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';

const ReportModal = ({ closeModal }) => {

    const HandleSend = () =>{
        Alert.alert("send successfully");
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

                    <Text style={ { color: 'red' , margin:10}}>Please calm before you sent report , we really care about you !!!</Text>

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

                    <TouchableOpacity style={{
                        width: '90%', // Set width as per your requirement
                        height: '30%', // Set height as per your requirement
                        borderRadius: '15%', // For a circular image, set borderRadius as half of width or height
                        borderWidth: 2, // Border width
                        borderColor: 'black', // Border color
                        borderStyle: 'dashed', // Border style (dashed)
                        marginTop:10,
                        justifyContent: 'center', // Căn giữa theo chiều dọc
                        alignItems: 'center', // Căn giữa theo chiều ngang
                    }}>
                        <AntDesign  name="camerao" size={40} color="black" />
                        <Text style ={{fontWeight:'bold',color:'black',fontSize:17}}>Upload your image</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={HandleSend}>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 , marginTop:5 }}>Send</Text>
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
