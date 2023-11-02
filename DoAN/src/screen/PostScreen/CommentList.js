import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import myGlobalVariable from '../../global';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';



const CommentList = ({ closeModal }) => {

    const [comments, setComments] = useState([]);

    const URL = myGlobalVariable;

    const fetchComments = async () => {
        try {
            const postId = 1; // Thay ID bài post cần lấy comment ở đây
            const response = await fetch(URL + `/api/Post/ListCommentPost?postId=${postId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []); // Gọi khi component được render

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.commentModal}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Comments:</Text>


                    <ScrollView>
                        {comments.map(comment => (
                            <View key={comment.id} style={{ margin: 7 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{comment.userFullName}</Text>
                                    <Text style={{ fontSize: 10 }}>{moment(comment.createDate).format('DD/MM/YYYY')}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ marginTop: 5, width: '70%' }}>Content: {comment.content}</Text>
                                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                                        <AntDesign name="hearto" size={24} color="black" />
                                        <Text style={{ margin: 3 }}>{comment.likeAmount}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TextInput
                            style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5, width: '80%', height: 30 }}
                            value={comments}
                            placeholder='add your comment'
                            onChangeText={text => setComments(text)}
                            multiline={true}
                        />
                        <TouchableOpacity style={{ marginLeft: 10 }}>
                            <Ionicons name="send-outline" size={24} color="black" />
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
