import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const CommentList = ({ closeModal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.commentModal}>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>
                    <Text>Content of the modal</Text>

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
    },
});

export default CommentList;
