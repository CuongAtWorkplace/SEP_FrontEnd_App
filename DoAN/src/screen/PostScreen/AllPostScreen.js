import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from 'expo-image-picker';
import { useRef } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Alert } from "react-native";
import { RefreshControl } from "react-native";

import User from "../../user";
import myGlobalVariable from "../../global";
import PostList from "./PostList";

export default function AllPostScreen() {
    const URL = myGlobalVariable;
    const selectDropdownRef = useRef(); // Tạo một tham chiếu

    const [imageSource, setImageSource] = useState({
        uri: URL + '/api/User/GetUserImage/GetImage/' + User + `?t=${new Date().getTime()}`
    });
    const [UserData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [title, setTitle] = useState(""); // State for TextInput
    const [des, setDes] = useState(""); // State for TextInput
    const countries = ["Bioloy", "Math", "English", "Physic"];
    const [selectedImage, setSelectedImage] = useState(null);
    const [selected, setSelected] = React.useState([]);
    const [AllPost, setAllPost] = React.useState([]);
    const [refreshing, setRefreshing] = useState(false); // Tạo trạng thái refreshing


    const onRefresh = () => {
        setRefreshing(true); // Đánh dấu trạng thái làm mới
        getUser(); // Gọi hàm getUser để tải lại dữ liệu
    };

    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);

                // Tạo FormData để gửi dữ liệu ảnh
                const formData = new FormData();
                formData.append('file', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg', // Loại ảnh, bạn có thể điều chỉnh tùy theo định dạng ảnh
                    name: 'image.jpg', // Tên tệp trên máy chủ
                });
                if (result.assets && result.assets.length > 0) {
                    setSelectedImage(result.assets[0].uri);
                }

            }
        }
    }

    const HandleCancel = () => {
        setSelectedImage(null);
    }

    const addNewPost = async () => {
        try {
            const formData = new FormData();

            // Ensure that a valid image is selected
            if (selectedImage) {
                // Create a file object from the selectedImage
                const imageFile = {
                    uri: selectedImage,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                };

                // Append the image file to the FormData object
                formData.append('file', imageFile);

                // Upload the image to the backend API
                const uploadResponse = await fetch(URL + '/api/Post/UploadImage', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (uploadResponse.ok) {
                    // Extract the image file name from the response
                    const imageFileName = await uploadResponse.text(); // Assuming the response contains the image file name

                    // Create the postData object with the image file name and selectedItem
                    const postData = {
                        createBy: User,
                        title: title,
                        description: des,
                        contentPost: selected, // Value from SelectDropdown
                        image: imageFileName, // Use the imageFileName value from the response
                    };

                    // Send the postData object to create the new post
                    const postResponse = await fetch(URL + '/api/Post/AddNewPost', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    });

                    if (postResponse.ok) {
                        // The post was added successfully
                        setSelectedImage(null);
                        console.log('New post added successfully');
                        Alert.alert('Notification', 'New post added successfully');

                    } else {
                        // Handle the case when the post addition fails
                        console.error('Failed to add a new post');
                    }
                } else {
                    Alert.alert('Lỗi', 'Cập nhật ảnh thất bại');
                }
            } else {
                Alert.alert('Lỗi', 'Chưa chọn ảnh');
            }
        } catch (error) {
            // Handle any network errors or exceptions
            console.error('Error adding a new post:', error);
        }
    };



    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await fetch(URL + '/api/User/GetStudentById/GetStudentById/' + User);
            const response2 = await fetch(URL + '/api/Post/GetAllPost');

            if (response.ok) {
                const user = await response.json();
                setUserData(user);
            }
            if (response2.ok) {
                const post = await response2.json();
                setAllPost(post);
                console.log(AllPost);

            }
        } catch (error) {
            console.error(error);
        } finally {
            console.log(AllPost);
            setRefreshing(false); // Đánh dấu trạng thái làm mới
            setLoading(false);
        }
    }

    return (
        <ScrollView
            //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Sử dụng RefreshControl ở đây
        >
            <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View>
                        <View style={styles.header}>
                            <Image source={imageSource} style={styles.avatar} />
                            <Text style={styles.username}>{UserData[0]?.fullName}</Text>
                        </View>


                        <TextInput
                            placeholder="Write a Title..."
                            onChangeText={(text) => setTitle(text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Write a description..."
                            onChangeText={(text) => setDes(text)}
                            defaultValue={des}
                            value={des}
                            multiline={true}
                            numberOfLines={4}
                        />
                        <View style={styles.row}>
                            <View style={styles.touchable}>
                                <TouchableOpacity onPress={openImagePicker}>
                                    <FontAwesome name="image" size={30} color="blue" />
                                </TouchableOpacity>

                                <View style={styles.selectContainer}>
                                    <SelectList
                                        style={styles.buttonStyle}
                                        setSelected={(val) => setSelected(val)}
                                        data={countries}
                                        save="value"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.touchable} onPress={addNewPost}>
                                <Text style={styles.postButtonText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {selectedImage && (
                    <View>
                        <View style={styles.centeredImageContainer}>
                            <Image source={{ uri: selectedImage }} style={styles.centeredImage} />
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', top: -5, marginLeft: 10 }} onPress={HandleCancel}>
                            <Text style={{ color: "blue", fontSize: 12 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <PostList posts={AllPost} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: "bold",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#DBE1E3",
        padding: 10,
        marginTop: 10,
        height: 80,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    touchable: {
        flexDirection: "row",
        alignItems: "center",
    },
    postButtonText: {
        fontSize: 17,
        color: "blue",
        marginRight: 10,
    },
    buttonStyle: {
        // Add custom button style here
        backgroundColor: '#6AA3DB', // Example background color\
        width: 100,
        height: 30,
    },
    buttonTextStyle: {
        // Add custom button text style here
        color: 'white', // Example text color
        fontSize: 9,
    },
    buttonContainer: {
        alignItems: 'flex-end', // Align the button to the right
        paddingRight: 20, // Add right padding to create space from the right edge
    },
    selectContainer: {
        marginLeft: 10,
    },
    centeredImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    // Style for the centered image
    centeredImage: {
        width: 300,
        height: 200,
        borderRadius: 10,

    },

});
