import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import { SearchBar, colors } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import HeaderBack from '../../../component/HeaderBack';
import RecommendList from '../../../component/RecommendList';
import myGlobalVariable from '../../global';

export default function ClassSearch() {
    const navigation = useNavigation();
    const [classCount, setClassCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [AllClassData, setAllClassData] = useState([]);

    const countries = ["Newest", "Oldest","Study"];
    const URL = myGlobalVariable;

    const handleBack = () => {
        navigation.navigate('Home');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response1 = fetch(URL + '/api/Class/GetAllClass/0');
                const [data1] = await Promise.all([response1]);

                if (data1.ok) {
                    const DataClass1 = await data1.json();
                    setAllClassData(DataClass1);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            <HeaderBack title="Search Class" action={handleBack} />

            <SearchBar
                placeholder="Search class"
                round={true}
                lightTheme={true}
                containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                inputContainerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                searchIcon={{ size: 24, color: 'black' }}
            />

            <View style={styles.buttonContainer}>

                <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
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
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <RecommendList list={AllClassData} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dropdownStyle: {
        // Add custom dropdown style here
        backgroundColor: 'white', // Example background color
        borderBlockColor: 1
    },
    buttonStyle: {
        // Add custom button style here
        backgroundColor: '#808080', // Example background color\
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        width: 100,
        height: 35,
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
});
