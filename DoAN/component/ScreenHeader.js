import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { sizes, spacing } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

const ScreenHeader = ({ mainTitle, secondTitle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.noti}>
      <MaterialIcons name="notifications" size={20} color={'#E4E4E4'} />    
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>{mainTitle}</Text>
        <Text style={styles.secondTitle}>{secondTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Sắp xếp các phần tử hàng ngang
    alignItems: 'center', // Căn giữa theo trục dọc
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  mainTitle: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: '#696C6E',
  },
  secondTitle: {
    fontSize: 20,
    color: '#696C6E',
    fontFamily: 'MartianMono-VariableFont_wdth,wght',
  },
  titleContainer: {
    flex: 1, // Để chia tỷ lệ không gian cho titleContainer và noti
    alignItems: 'flex-end', // Đặt titleContainer bên phải
  },
  noti: {
    width: 30, // Đặt chiều rộng của phần tử noti
    height: 30, // Đặt chiều cao của phần tử noti
    backgroundColor: '#020202', // Màu nền của phần tử noti
    borderRadius: 20, // Đặt borderRadius để tạo hình tròn
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ScreenHeader;
