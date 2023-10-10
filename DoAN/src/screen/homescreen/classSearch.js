import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import { SearchBar, colors } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import HeaderBack from '../../../component/HeaderBack';
import RecommendList from '../../../component/RecommendList';
import myGlobalVariable from '../../global';
import User from '../../user';

export default function ClassSearch() {
    const navigation = useNavigation();
    const [classCount, setClassCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [AllClassData, setAllClassData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const countries = ["Newest", "Oldest", "Study"];
    const URL = myGlobalVariable;

    const handleBack = () => {
        navigation.navigate('Home');
    };


    const handleSearch = async (text) => {
        try {
            // Gửi yêu cầu fetch đến API để tìm kiếm lớp học
            const response1 = await fetch(URL + '/api/Class/GetClassWithCourseAndClassName/' + text);

            if (response1.ok) {
                // Parse dữ liệu JSON từ phản hồi
                const data1 = await response1.json();
                // Sử dụng dữ liệu đã lấy được
                setAllClassData(data1);
            } else {
                // Xử lý trường hợp lỗi
                console.error('Response not OK');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchOnSubmit = () => {
        setIsLoading(true);

        if (searchText == '') {
            fetchData();
            setIsLoading(false);
        }
        else {
            handleSearch(searchText); // Gọi hàm tìm kiếm khi người dùng ấn "Enter
            setIsLoading(false);

        }
    };

    const fetchData = async () => {
        try {
            const response1 = fetch(URL + '/api/Class/GetAllClassWithCourse/GetAllClass/0');
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

    useEffect(() => {

        fetchData();
    }, []);


    const handleSelect = async (selectedItem, index) => {
        try {
          if (selectedItem === 'Newest') {
            const response1 = await fetch(URL + '/api/Class/GetClassByDate/ascend');
            if (response1.ok) {
              const data1 = await response1.json();
              setAllClassData(data1);
            }
          } else if (selectedItem === 'Oldest') {
            const response1 = await fetch(URL + '/api/Class/GetClassByDate/descend');
            if (response1.ok) {
              const data1 = await response1.json();
              setAllClassData(data1);
            }
          } else if (selectedItem === 'Study') {
            const response1 = await fetch(URL + '/api/ListStudentClass/AllUserClassRegister/AllUserClassRegister/' + User);
            if (response1.ok) {
              const data1 = await response1.json();
              setAllClassData(data1);
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      

    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            <HeaderBack title="Search Class" action={handleBack} />

            <SearchBar
                placeholder="Search class"
                round={true}
                lightTheme={true}
                containerStyle={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                }}
                inputContainerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                searchIcon={{ size: 24, color: 'black' }}
                onChangeText={(text) => {
                    setSearchText(text);
                }}
                onSubmitEditing={handleSearchOnSubmit} // Gọi hàm khi người dùng ấn "Enter"
                value={searchText}
            />
            <View style={styles.buttonContainer}>

                <SelectDropdown
                    data={countries}
                    onSelect={handleSelect} // Gọi hàm handleSelect khi người dùng chọn một mục

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
