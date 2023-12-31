import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";


const HeaderBack = (props) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={props.action}>
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Màu nền của tiêu đề
    height:50, // Chiều cao của tiêu đề
  },
  iconContainer: {
    position: 'absolute',
    left: 10, // Điều chỉnh khoảng cách từ biểu tượng đến bên trái
    justifyContent: 'center',

  },
  title: {
    fontSize: 20, // Kích thước của tiêu đề
    fontWeight: 'bold', // Độ đậm của tiêu đề
    justifyContent: 'center',

  },
});

export default HeaderBack;