import React, { useState } from 'react';
import { Button, Image, Text } from 'react-native';
import { StyleSheet, ScrollView, View } from 'react-native';
import { colors, sizes, spacing } from '../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const CARD_WIDTH = sizes.width - 20;
const CARD_HEIGHT = 200;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 30,
        alignItems: 'center', // Để căn giữa theo chiều ngang
        justifyContent: 'center', // Để căn giữa theo chiều dọc
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',
    },
    textOnImage: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Màu văn bản
        fontSize: 30, // Kích thước văn bản
        fontWeight: 'bold'
    },
    Arrowback: {
        position: 'absolute',
        top: 7, // Điều chỉnh vị trí theo nhu cầu
        left: 10,
    },
    actionButton: {
        position: 'absolute',
        borderRadius: 15,
        bottom: 15,
        width: 100,
        height: 35,
        justifyContent: 'center', // Để căn giữa theo chiều ngang
        alignItems: 'center',
        flexDirection: 'row', // Xếp theo hàng ngang

    },
    report: {
        backgroundColor: '#D13B3B',
        left: 50,
    },
    enroll: {
        backgroundColor: '#4C9F50',
        right: 50,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    des: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20, // Khoảng cách giữa phần mô tả và hình ảnh
    },
    desText: {
        textAlign: 'justify', // Căn đều văn bản
        marginHorizontal: 20, // Khoảng cách lề hai bên
        marginTop: 20, // Khoảng cách giữa phần mô tả và hình ảnh

    }

});

export default function classDetail(props) {

    const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home')
  };

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
                <Text style={styles.textOnImage}>SEP_490</Text>

                <TouchableOpacity style={styles.Arrowback} onPress={handleBack}>
                    <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.report]}>
                    <Text style={styles.buttonText}>Report </Text>
                    <MaterialIcons style={styles.reportIcon} name="report" size={17} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.enroll]}>
                    <Text style={styles.buttonText}>Enroll </Text>
                    <AntDesign name="pluscircleo" size={15} color="white" />
                </TouchableOpacity>

            </View>

            <Text style={styles.des}>Description</Text>
            <Text style={styles.desText}>
                The Basic English Communication Class is a course that provides students with fundamental knowledge and skills to confidently communicate in various everyday situations. This course is designed for learners at a basic level and does not require prior knowledge of English.
            </Text>
        </ScrollView>
    )
}