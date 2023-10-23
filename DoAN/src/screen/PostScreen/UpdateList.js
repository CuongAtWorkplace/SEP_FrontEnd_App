import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import myGlobalVariable from '../../global';
import User from '../../user';

export default function UpdateList({ posts }) {
    const URL = myGlobalVariable;

    const [editingStatus, setEditingStatus] = useState({});
    const [editedValues, setEditedValues] = useState({});
    const [selectedImages, setSelectedImages] = useState({});

    const handleEdit = (postId) => {
        setEditingStatus({
            ...editingStatus,
            [postId]: true,
        });

        setEditedValues({
            ...editedValues,
            [postId]: {
                title: posts.find((post) => post.postId === postId).title,
                description: posts.find((post) => post.postId === postId).description,
            },
        });
    };

    const openImagePicker = async (postId) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

    
            if (result.assets && result.assets.length > 0) {
                setSelectedImages({
                    ...selectedImages,
                    [postId]: result.assets[0].uri,
                });
            }
        
    };

    const handleSave = async (postId) => {
        setEditingStatus({
            ...editingStatus,
            [postId]: false,
        });

        const editedData = editedValues[postId];


        if (selectedImages[postId]) {
            try {
                const formData = new FormData();
                const imageUri = selectedImages[postId];

                const imageFile = {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                };

                formData.append('file', imageFile);

                const uploadResponse = await fetch(URL + '/api/Post/UploadImage', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (uploadResponse.ok) {
                    // Lấy tên tệp hình ảnh từ phản hồi (nếu cần)
                    const imageFileName = await uploadResponse.text();

                    console.log(imageFileName);

                    const response = await fetch(URL + '/api/Post/UpdatePost', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            postId: postId,
                            createBy: User,
                            title: editedData.title,
                            description: editedData.description,
                            contentPost:"aaaa",
                            likeAmout: 0,
                            image: imageFileName, // Nếu bạn cần lưu tên tệp hình ảnh
                        }),
                    });

                    if (response.ok) {
                        console.log('Bài đăng đã được cập nhật thành công');
                        Alert.alert('Notification', 'Bài đăng đã được cập nhật thành công');
                    } else {
                        console.error('Lỗi khi cập nhật bài đăng');
                    }
                } else {
                    Alert.alert('Lỗi', 'Cập nhật ảnh thất bại');
                }
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu cập nhật bài đăng:', error);
            }
        } 
    };

    const handleCancel = (postId) => {
        setEditingStatus({
            ...editingStatus,
            [postId]: false,
        });
        setEditedValues({
            ...editedValues,
            [postId]: {
                title: posts.find((post) => post.postId === postId).title,
                description: posts.find((post) => post.postId === postId).description,
            },
        });
    };

    return (
        <View style={{ marginBottom: 70 }}>
            <FlatList
                data={posts}
                keyExtractor={(post) => post.postId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                            {editingStatus[item.postId] ? (
                                <TextInput
                                    style={styles.textInput}
                                    value={editedValues[item.postId].title}
                                    onChangeText={(text) =>
                                        setEditedValues({
                                            ...editedValues,
                                            [item.postId]: {
                                                ...editedValues[item.postId],
                                                title: text,
                                            },
                                        })
                                    }
                                />
                            ) : (
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    {item.title}
                                </Text>
                            )}
                            <Text style={{ fontWeight: 'bold' }}># {item.contentPost}</Text>
                        </View>
                        {editingStatus[item.postId] ? (
                            <TextInput
                                style={styles.textInput}
                                value={editedValues[item.postId].description}
                                onChangeText={(text) =>
                                    setEditedValues({
                                        ...editedValues,
                                        [item.postId]: {
                                            ...editedValues[item.postId],
                                            description: text,
                                        },
                                    })
                                }
                            />
                        ) : (
                            <Text style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold' }}>
                                {item.description}
                            </Text>
                        )}
                        <View style={styles.imageContainer}>
                            {editingStatus[item.postId] ? (
                                <Image
                                    style={styles.image}
                                    source={{ uri: selectedImages[item.postId] || URL + '/api/Post/GetImage/' + item.postId }}
                                />
                            ) : (
                                <Image
                                    style={styles.image}
                                    source={{ uri: URL + '/api/Post/GetImage/' + item.postId }}
                                />
                            )}
                            {editingStatus[item.postId] && (
                                <TouchableOpacity
                                    style={styles.customButton}
                                    onPress={() => openImagePicker(item.postId)}>
                                    <AntDesign name="picture" size={40} color="black" />
                                </TouchableOpacity>
                            )}
                            <View style={styles.touchable}>
                                {editingStatus[item.postId] ? (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={styles.saveButton}
                                            onPress={() => handleSave(item.postId)}>
                                            <Text style={{ fontSize: 17, color: "blue", marginRight: 10 }}>
                                                Save
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => handleCancel(item.postId)}>
                                            <Text style={{ fontSize: 17, color: "red", marginRight: 10 }}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.editCancelContainer}>
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => handleEdit(item.postId)}>
                                            <Text style={{ fontSize: 17, color: "blue", marginRight: 10 }}>
                                                Edit
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        marginTop: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space between',
    },
    touchable: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    textInput: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    saveButton: {
        marginRight: 10,
    },
    editButton: {
        marginRight: 10,
    },
    cancelButton: {
        marginRight: 10,
    },
    editCancelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    customButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});
