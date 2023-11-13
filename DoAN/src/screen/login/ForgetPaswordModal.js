import React from "react"
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';


const ForgetPaswordModal = ({ closeModal }) => {

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})

export default ForgetPaswordModal;
