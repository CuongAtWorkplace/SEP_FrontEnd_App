import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ReportModal = ({ closeModal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.commentModal}>
                    <MaterialIcons name="report-problem" size={40} color="red" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginLeft: 10 }}>Report</Text>

                    <Text style={{ color: 'red' }}>Các bạn bình tĩnh trước khi report nhé !!!</Text>

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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-start' }}>
                            <Ionicons name="images-outline" size={24} color="red" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 17 }}>Send</Text>
                        </TouchableOpacity>
                    </View>




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
