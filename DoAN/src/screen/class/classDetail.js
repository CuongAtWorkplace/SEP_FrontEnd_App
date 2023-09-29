import React, { useState } from 'react';
import Text from '../../../component/TextInput';
import { Image } from 'react-native';
import { StyleSheet, ScrollView, View } from 'react-native';
import { sizes, spacing } from '../../../constants/theme';

const CARD_WIDTH = sizes.width - 20;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function classDetail({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://www.tastingtable.com/img/gallery/why-classroom-heaters-were-once-used-as-school-kitchens/intro-1660759308.jpg',
          }}
        />
        <Text>aaaaa</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 30,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
});
