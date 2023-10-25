import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, shadow, sizes, spacing } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import myGlobalVariable from '../src/global';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;


const TopPlacesCarousel = ({ list, onPress }) => {

  const navigation = useNavigation();

  const goToClassDetail = (id) => {
    // Chuyển đến trang classDetail và truyền ID qua route.params
    navigation.navigate('ClassDetail', { classId: id });
  };


  const URL = myGlobalVariable

  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}
            onPress={() => goToClassDetail(item.classId)} // Gọi hàm goToClassDetail với ID
          >
            <View style={styles.card}>

              <View style={styles.imageBox}>
                <Image style={styles.image}
                  source={{ uri: URL + '/api/Course/GetImage/GetImage/' + item.courseId }}
                />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.classname}</Text>
                <Text style={styles.location}>{item.courseName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlacesCarousel;