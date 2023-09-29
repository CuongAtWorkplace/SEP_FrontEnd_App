import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

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

const TOP_PLACES = [
  {
    id: 1,
    title: 'Amalfi',
    location: 'Italy',
    description:
      'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
  },
  {
    id: 2,
    title: 'Granada',
    location: 'Spain',
    description:
      'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
  },
  {
    id: 3,
    title: 'Cherry blossoms',
    location: 'Japan',
    description:
      "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
  },
];

const PLACES = [
  {
    id: 4,
    title: 'Cappadocia',
    location: 'Turkey',
    description:
      "Cappadocia's landscape includes dramatic expanses of soft volcanic rock, shaped by erosion into towers, cones, valleys, and caves. Rock-cut churches and underground tunnel complexes from the Byzantine and Islamic eras are scattered throughout the countryside.",
  },
  {
    id: 5,
    title: 'Capri',
    location: 'Italy',
    description:
      'Capri is an island of a thousand faces, where visitors can walk the trails skirting the cliffs above the Mediterranean in total solitude, dive into the crystalline waters of its rocky shore, or plunge into the vibrant crowds of the Piazzetta and shop in the most fashionable boutiques in the world.',
  },
  {
    id: 6,
    title: 'Bora Bora',
    location: 'Polynesia',
    description:
      'Learn how you can travel Bora Bora on a budget and how overwater bungalows are possible for cheap plus tips on keeping Bora Bora trip costs low.',
  },
  {
    id: 7,
    title: 'Phuket',
    location: 'Thailand',
    description:
      'Phuket is the largest island in Thailand. It is located in the Andaman Sea in southern Thailand',
  },
];

export default function Home() {
  const navigation = useNavigation();

  const handleDetailClass = () => {
    navigation.navigate('Login')
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Knoco</Text>
        <TouchableOpacity
          onPress={() => {
            // Xử lý sự kiện khi biểu tượng chuông được nhấn
            // Ví dụ: mở một màn hình thông báo
            navigation.navigate('');
          }}
        >
          <Ionicons name="notifications-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <ScreenHeader mainTitle="Welcome back !" secondTitle="Ngo Ba Cuong" />
      <View style={styles.searchContainer}>
        <Searchbar
          style={styles.search}
          placeholder="Search Class..."
          inputStyle={styles.searchInput}
        />
      </View>

      <SectionHeader
        title="Recommend Class"
        onPress={() => { }}
      />
      <TopPlacesCarousel list={TOP_PLACES}  actionClass={handleDetailClass} />
      <SectionHeader
        title="All Class"
        buttonTitle="See All"
        onPress={() => { }}
      />
      <RecommendList list={PLACES} />
     
    </ScrollView>
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
});





