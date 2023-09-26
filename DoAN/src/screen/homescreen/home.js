import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import RecommendList from '../../../component/RecommendList';
import TopPlacesCarousel from '../../../component/TopPlacesCarousel';
import SectionHeader from '../../../component/SectionHeader';

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

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="Recommend Class"
        onPress={() => { }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="All Class"
          buttonTitle="See All"
          onPress={() => { }}
        />
        <RecommendList list={PLACES} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Thay 'colors.light' bằng màu bạn mong muốn
  },
});
