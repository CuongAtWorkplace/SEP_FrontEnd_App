import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, RefreshControl, ScrollViewBase } from "react-native";
import UpdateList from "./UpdateList";
import User from "../../user";
import myGlobalVariable from "../../global";






export default function UpdateScreen({ navigation }) {
    const URL = myGlobalVariable;
    const [allPost, setAllPost] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(URL + '/api/Post/GetUserPost/' + User);
            if (response.ok) {
                const post = await response.json();
                setAllPost(post);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchUserPosts();
    };

    useEffect(() => {
        // Hide the status bar when the component mounts
        StatusBar.setHidden(true);
        handleRefresh(); // Initial fetch when the component mounts


    }, []);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            <UpdateList posts={allPost} />
        </ScrollView>
    );

}