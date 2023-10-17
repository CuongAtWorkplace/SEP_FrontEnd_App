import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from "react-native-select-dropdown";



import User from "../../user";
import myGlobalVariable from "../../global";

export default function AllPostScreen() {
    const URL = myGlobalVariable;

    const [imageSource, setImageSource] = useState({
        uri: URL + '/api/User/GetUserImage/GetImage/' + User + `?t=${new Date().getTime()}`
    });
    const [UserData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [des, setDes] = useState(""); // State for TextInput
    const countries = ["Bioloy", "Math","English","Physic"];



    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(URL + '/api/User/GetStudentById/GetStudentById/' + User);

                if (response.ok) {
                    const user = await response.json();
                    setUserData(user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, []);

    return (
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
                        onChangeText={(text) => setCaption(text)}
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
                            <TouchableOpacity  >
                                <FontAwesome name="image" size={30} color="blue" />
                            </TouchableOpacity>

                            <View style={styles.selectContainer}>
                                <SelectDropdown
                                    data={countries}
                                    defaultButtonText="Choose Content "
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    dropdownStyle={styles.dropdownStyle} // Apply custom style to the dropdown
                                    buttonStyle={styles.buttonStyle} // Apply custom style to the button
                                    buttonTextStyle={styles.buttonTextStyle} // Apply custom style to the button text
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.touchable} >
                            <Text style={styles.postButtonText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
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
        marginRight:10,
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
        marginLeft:10,
    },
});
