import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, sizes, spacing } from '../constants/theme';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const ScreenHeader = ({ mainTitle, secondTitle }) => {

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>{mainTitle}</Text>
        <Text style={styles.secondTitle}>{secondTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.black,
  },
  secondTitle: {
    fontSize: 15,
    fontWeight:'bold',
    color: colors.black,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  noti: {
    width: 30,
    height: 30,
    backgroundColor: '#020202',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenHeader;