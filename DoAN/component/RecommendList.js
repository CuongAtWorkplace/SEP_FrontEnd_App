import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, shadow, sizes, spacing } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import myGlobalVariable from '../src/global';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;


const RecommendList = (props) => {

  const navigation = useNavigation();

  const goToClassDetail = (id) => {
    // Chuyển đến trang classDetail và truyền ID qua route.params
    navigation.navigate('ClassDetail', { classId: id });
  };

  const URL = myGlobalVariable;

  return (
    <View style={styles.container}>
      {props.list.map((item, index) => {
        return (
          <TouchableOpacity style={styles.cardContainer}
            onPress={() => goToClassDetail(item.classId)} // Gọi hàm goToClassDetail với ID
          >
            <View style={[styles.card, shadow.light]} key={item.id}>
              <View style={styles.imageBox}>
                <Image style={styles.image}
                  source={{ uri: URL + '/api/Course/GetImage/GetImage/' + item.courseId }}
                />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.classname}</Text>
                  <Text style={styles.location}>{item.courseName}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
    elevation: 100,

  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default RecommendList;