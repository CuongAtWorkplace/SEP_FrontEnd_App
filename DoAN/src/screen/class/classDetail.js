import React from 'react';
import { Image, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

const CARD_WIDTH = sizes.width - 20;
const CARD_HEIGHT = 200;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 30,
        alignSelf: 'center',
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',
    },
    textOnImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    Arrowback: {
        position: 'absolute',
        top: 7,
        left: 10,
    },
    actionButton: {
        position: 'absolute',
        borderRadius: 15,
        bottom: 15,
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    report: {
        backgroundColor: '#D13B3B',
        left: 50,
    },
    enroll: {
        backgroundColor: '#4C9F50',
        right: 50,
    },
    Chat: {
        left: 100,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 5,
    },
    des: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        textAlign: 'center',
    },
    desText: {
        textAlign: 'justify',
        marginHorizontal: 20,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 20,
        alignItems: 'center', // Để căn giữa các container theo chiều ngang
        justifyContent: 'center'
    },
    linearGradient: {
        width: 140,
        height: 120,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10, // Khoảng cách giữa các container
        marginLeft: 10, // Khoảng cách giữa các container
    },
    meetingRoomContainer: {
        alignItems: 'center', // Để căn giữa theo chiều ngang
        marginTop: 20,
        marginBottom: 20,
    },
    meetingRoom: {
        height: 80,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
});

export default function classDetail(props) {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity>

                    <LinearGradient colors={['#0093E9', '#80D0C7']} style={styles.linearGradient}>
                        <Feather name="message-circle" size={24} color="white" />
                        <Text style={styles.buttonText}>Group chat</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity>
                    <LinearGradient colors={['#FF3CAC', '#784BA0', '#2B86C5']} style={styles.linearGradient}>
                        <MaterialIcons name="assignment" size={24} color="white" />
                        <Text style={styles.buttonText}>Quiz</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.meetingRoomContainer}>
                <LinearGradient colors={['#ED213A', '#93291E']} style={styles.meetingRoom}>
                    <FontAwesome5 name="chalkboard-teacher" size={24} color="white" />
                    <Text style={styles.buttonText}>Meeting room</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView >
    );
}
