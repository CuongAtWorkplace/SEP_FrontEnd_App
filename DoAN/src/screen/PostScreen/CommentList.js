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
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';


const CommentList = ({ closeModal, postId }) => {

    const [comments, setComments] = useState([]);
    const [commentSend, setCommentSend] = useState([]);
    const [likedComments, setLikedComments] = useState([]);


    const UserID = useSelector((state) => state.user.userId);

    const URL = myGlobalVariable;

    const handleComment = () => {

        if (commentSend == "") {
            Alert.alert("Please type your comment");
        } else {
            const commentData = {
                userId: UserID,
                postId: postId,
                content: commentSend
            };

            fetch(URL + '/api/Post/AddCommentPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Comment added successfully:', data);
                    // Xử lý khi comment được thêm thành công
                    Alert.alert("Comment added successfully");
                    setCommentSend("");
                })
                .catch(error => {
                    console.error('There was a problem adding the comment:', error);
                    // Xử lý khi có lỗi xảy ra trong quá trình thêm comment
                });
        }
    };


    const updateCommentLike = async (id) => {

        try {
            const response = await fetch(`${URL}/api/Post/UpdateLikeComment?CommentId=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {

                setLikedComments((prevLikedComments) => ({
                    ...prevLikedComments,
                    [id]: true,
                }));

            } else {
                // Xử lý khi API gọi không thành công
                const errorData = await response.json();
                console.error('Failed to update like for post:', errorData.message);
            }
        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error('Error calling UpdateLikePost API:', error.message);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch(URL + `/api/Post/ListCommentPost2?postId=${postId}`);
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


                    <ScrollView style={{ height: '30%' }}>
                        {comments.length === 0 ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'silver' }}>No comment yet</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={comments}
                                keyExtractor={(item, index) => index.toString()} // Thiết lập key cho mỗi mục
                                renderItem={({ item }) => (
                                    <View key={item.id} style={{ margin: 7 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.userFullName}</Text>
                                            <Text style={{ fontSize: 10 }}>
                                                {moment(item.createDate).format('DD/MM/YYYY')}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ marginTop: 5, width: '70%' }}>Content: {item.content}</Text>
                                            <TouchableOpacity style={{ flexDirection: 'row' }}
                                                onPress={() => updateCommentLike(item.userCommentPostId)}
                                                disabled={likedComments[item.userCommentPostId]}
                                            >
                                                <AntDesign name={likedComments[item.userCommentPostId] ? 'heart' : 'hearto'} size={24} color={likedComments[item.userCommentPostId] ? 'red' : 'black'} />
                                                <Text style={{ margin: 3 }}>
                                                     {item.likeAmount + (likedComments[item.userCommentPostId] ? 1 : 0)}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />

                        )}
                    </ScrollView>


                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TextInput
                            style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5, width: '80%', height: 30 }}
                            value={commentSend}
                            placeholder='add your comment'
                            onChangeText={text => setCommentSend(text)}
                            multiline={true}
                        />
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleComment}>
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
