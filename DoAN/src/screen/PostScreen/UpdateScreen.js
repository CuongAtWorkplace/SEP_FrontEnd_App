import React from "react";
import { View, Text } from "react-native";
import { useEffect } from "react";
import UpdateList from "./UpdateList";

import User from "../../user";
import myGlobalVariable from "../../global";


export default function UpdateScreen({ navigation }) {


    const URL = myGlobalVariable;

    const [AllPost, setAllPost] = React.useState([]);



    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(URL + '/api/Post/GetUserPost/' + User);
                if (response.ok) {
                    const post = await response.json();
                    setAllPost(post);
                }

            } catch (error) {
                console.error(error);
            } finally {
                console.log(AllPost);

                setLoading(false);
            }
        }

        getUser();
    }, []);

    return (
        <View>
            <UpdateList posts={AllPost}/>
        </View>
    );
}