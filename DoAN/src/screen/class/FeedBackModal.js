import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';
import myGlobalVariable from '../../global';



const FeedBackModal = ({ closeModal }) => {

    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);

    const URL = myGlobalVariable ;
    const UserID = useSelector((state) => state.user.userId);


    const onStarRatingPress = (rating) => {
        setRating(rating);
    };

    const handleSend = async () => {

        if(feedbackText == '' || rating == 0){
            Alert.alert("Please fill out all text input");
            return ;
        }

        try {
            const response = await fetch(URL+'/api/Report/AddFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fromUserId : UserID ,
                    rating: rating,
                    description: feedbackText,
                    createDate : new Date().toISOString(),
                    modifileDate : new Date().toISOString(),
                    isDelete : false
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
         
            Alert.alert('Feedback sent successfully');
        } catch (error) {
            console.error('Error sending feedback:', error);
            Alert.alert('Error sending feedback. Please try again later.');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.commentModal}>
                    <Feather name="mail" size={24} color="blue" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue', marginLeft: 10 }}>Feedback</Text>

                    <Text style={styles.description}>Please provide your description:</Text>
                    <TextInput
                        style={styles.input}
                        value={feedbackText}
                        onChangeText={text => setFeedbackText(text)}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <Text style={styles.description}>Rate Your Class :</Text>

                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={rating}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        fullStarColor={'gold'} // Màu của sao đã chọn
                        emptyStarColor={'grey'} // Màu của sao chưa chọn
                        starSize={30} // Kích thước của mỗi sao
                        starStyle={{ marginRight: 8 }} // Tùy chỉnh style của mỗi sao
                    />
                    <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                        <Text style={{fontWeight:'bold' , fontSize:20 , color:'blue'}} onPress={handleSend}>Send</Text>
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
        justifyContent: 'center', // Để căn giữa theo chiều ngang
        alignItems: 'center', // Để căn giữa theo chiều dọc
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
        alignSelf: 'flex-start' ,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top',
        margin: 10,
        padding: 10,
        width: '100%',
    },
});
export default FeedBackModal;
