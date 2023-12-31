import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

import RecommendList from '../../../component/RecommendList';
import TopPlacesCarousel from '../../../component/TopPlacesCarousel';
import SectionHeader from '../../../component/SectionHeader';
import { Searchbar } from 'react-native-paper';
import ScreenHeader from '../../../component/ScreenHeader';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import myGlobalVariable from '../../global';
import ActivityIndicator from 'react-native-paper';
import { colors } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import User from '../../user';


export default function Home() {

  const navigation = useNavigation();

  const handleDetailClass = () => {
    navigation.navigate('ClassDetail')
  };


  const handleSearch = () => {
    navigation.navigate('ClassSearch')
  };


  const [AllClassData, setAllClassData] = useState([]);
  const [AllStudyingClass, setAllStudyingClass] = useState([]);
  const [AllRecommend, setAllRecommend] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [UserData, setUserData] = useState([]);


  const URL = myGlobalVariable;

  const UserID = useSelector((state) => state.user.userId);


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Đặt refreshing thành true để hiển thị spinner refresh
    setRefreshing(true);

    fetchData();
    setRefreshing(false);
  };

  const fetchData = async () => {
    // StatusBar.setHidden(true);

    console.log(UserID);
    try {
      const response1 = await fetch(URL + '/api/Class/GetAllClassWithCourse/GetAllClass/5');
      const response2 = await fetch(URL + '/api/Class/GetAllClassWithCourse/GetAllClass/3');
      const response3 = await fetch(URL + '/api/User/GetStudentById/GetStudentById/' + UserID);
      const response4 = await fetch(URL + '/api/ListStudentClass/AllUserClassRegister/AllUserClassRegister/' + UserID);

      const [data1, data2, data3, data4] = await Promise.all([response1, response2, response3, response4]);

      if (data1.ok) {
        const DataClass1 = await data1.json();
        setAllClassData(DataClass1);
      }

      if (data2.ok) {
        const DataClass2 = await data2.json();
        setAllRecommend(DataClass2);
      }
      if (data3.ok) {
        const DataClass3 = await data3.json();
        setUserData(DataClass3);
      }
      if (data4.ok) {
        const DataClass4 = await data4.json();
        setAllStudyingClass(DataClass4);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Đặt isLoading thành false sau khi tải dữ liệu xong hoặc gặp lỗi
      setRefreshing(false);

    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Knoco</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={handleSearch} style={{ marginRight: 10 }}>
              <Ionicons name="search-circle-outline" size={37} color="black" />
            </TouchableOpacity>
          </View>
        </View>



        {!isLoading && ( // Kiểm tra isLoading, nếu false, hiển thị nội dung
          <>
            <ScreenHeader mainTitle='Welcome back !!!' secondTitle={UserData[0]?.fullName} />

            <SectionHeader title="Recommend Class" />
            <TopPlacesCarousel list={AllRecommend} onPress={handleDetailClass} />

            <SectionHeader title="All Class" />
            <RecommendList list={AllClassData} />

            <SectionHeader title="Studying Class" />
            {AllStudyingClass.length === 0 ? (
              <Text style={styles.noClassText}>No Class Studying</Text>
            ) : (
              <RecommendList list={AllStudyingClass} />
            )}
          </>
        )}
        {isLoading && (
          <View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  search: {
    backgroundColor: '#CACED1',
    width: 300,
    height: 40,
  },
  searchInput: {
    margin: -8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    height: 1, // Điều chỉnh độ dày của dòng ngăn cách
    backgroundColor: '#CCCCCC', // Màu của dòng ngăn cách
    marginHorizontal: 0, // Khoảng cách từ lề trái và lề phải
    marginVertical: 8, // Khoảng cách từ lề trên và lề dưới
    fontWeight: 'bold'
  },
  noClassText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#848482',
  },
  imageBox: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 30,
    alignSelf: 'center',
  },
});





