import React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, sizes, spacing } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SectionHeader = ({ title }) => {

  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate('ClassSearch')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.seeAllButton} onPress={handleSearch}>
        <Text style={styles.seeAllText}>See All</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: spacing.l,
    marginRight: spacing.m,
    marginTop: spacing.l,
    marginBottom: 10,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: '#3E427B',
  },
  seeAllButton: {
    flexDirection: 'row', // Sử dụng flexDirection để đặt cùng một dòng
    alignItems: 'center',
  },
  seeAllText: {
    marginRight: 5, // Để tạo khoảng cách giữa "See All" và biểu tượng
  },
});

export default SectionHeader;
