import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';  
import { colors } from "../constants/theme";

export default function SettingItem(props) {
  return (
    <TouchableOpacity style={styles.itembox}>
      <View style={styles.itemContent}>
        <AntDesign name={props.iconName} size={30} color={colors.black} />
        <Text style={styles.SettingText} >{props.text}</Text>
        <MaterialIcons style={styles.next} name="navigate-next" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itembox: {
    margin:10,
    backgroundColor:'#FFF',
    borderRadius:15 ,
    padding:10,
    elevation: 5
  },
  SettingText:{
    fontWeight:"bold",
    fontSize: 15,
    margin: 10,
  },
  itemContent: {
    flexDirection: "row", // Sắp xếp các phần tử con theo chiều ngang
    alignItems: "center", // Căn chỉnh các phần tử con theo chiều dọc
  },
  next: {
    marginLeft: 'auto', // Đặt khoảng cách bên trái của view là "auto" để đặt nó bên phải
  },
});
