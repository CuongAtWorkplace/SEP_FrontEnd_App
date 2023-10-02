import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import HeaderBack from '../../../component/HeaderBack';

export default function ClassSearch() {
    const navigation = useNavigation();
    const [classCount, setClassCount] = useState(0); // State để lưu số lượng phần tử
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        navigation.navigate('Home');
    };

    // Gọi API và cập nhật state khi component được tạo ra
    useEffect(() => {
        fetch('https://localhost:7169/api/Class')
            .then((response) => response.json())
            .then((data) => {
                setClassCount(data.length);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <HeaderBack title="Search Class" action={handleBack} />

            <SearchBar
                placeholder="Search class"
                round={true}
                lightTheme={true}
                containerStyle={{ backgroundColor: 'white', borderWidth: 0, borderColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                inputContainerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                searchIcon={{ size: 24, color: 'black' }}
            />

            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <Text>Total Classes: {classCount}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({

});
