import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';


export default function Report() {
    return (
        <Modal
            visible={true}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text>This is your modal content.</Text>
                    <TouchableOpacity style={styles.closeButton}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
});
