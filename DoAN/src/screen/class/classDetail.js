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
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';


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
        top: '30%',
        left: '40%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        color: 'black',
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
    DetailContainer: {
        width: 300,
        height: CARD_HEIGHT - 30,
        borderRadius: 20,
        backgroundColor: colors.black,
        alignSelf: 'center',

    },
    detailText: {
        textAlign: 'justify',
        marginHorizontal: 20,
        marginTop: 5,
    },
    feeText: {
        color: colors.gray,
        fontWeight: 'bold',
        fontSize: 20, // Điều chỉnh kích thước văn bản tùy theo nhu cầu của bạn
        textAlign: 'center', // Để canh giữa văn bản theo chiều ngang
        transform: [{ translateX: -50 }, { translateY: -50 }],
        position: 'absolute',
        top: '60%',
        left: '50%',
    }

});

export default function classDetail(props) {


    const navigation = useNavigation();

    const [showButtons, setShowButtons] = useState(false);


    const handleBack = () => {
        navigation.navigate('Home');
    };

    const handleEnroll = () => {
        setShowButtons(true);
    }

    const route = useRoute();
    const { classId } = route.params; // Lấy ID từ route.params

    const [classData, setClassData] = useState([]);
    const [imageUrl, setImageUrl] = useState(''); // State để lưu URL hình ảnh từ API
    const [isLoading, setIsLoading] = useState(true);


    const URL = 'https://c48f-123-24-215-136.ngrok-free.app';

    useEffect(() => {
        async function getClassById() {
            const response = await fetch(URL + '/api/Class/GetClassById/' + classId);
            const JsonConvert = await response.json();
            setClassData(JsonConvert);
            setIsLoading(false);

        }
        getClassById();
    });

    return (
        <ScrollView style={styles.container}>
            {!isLoading && (
                <View style={styles.imageBox}>
                    <Image
                        style={styles.image}
                        source={{ uri: URL + '/GetImage/' + classData[0]?.courseId }}
                    />
                    <Text style={styles.textOnImage}>ENGLISH_490</Text>

                    <Text style={styles.feeText}>Fee : {classData[0]?.fee}</Text>

                    <TouchableOpacity style={styles.Arrowback} onPress={handleBack}>
                        <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
                    </TouchableOpacity>

                    {showButtons && (

                        <TouchableOpacity style={[styles.actionButton, styles.report]}>
                            <Text style={styles.buttonText}>Report </Text>
                            <MaterialIcons style={styles.reportIcon} name="report" size={17} color="white" />
                        </TouchableOpacity>
                    )}
                    {!showButtons && (

                        <TouchableOpacity style={[styles.actionButton, styles.enroll]} onPress={handleEnroll}>
                            <Text style={styles.buttonText}>Enroll </Text>
                            <AntDesign name="pluscircleo" size={15} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {!isLoading && (
                <>
                    <Text style={styles.des}>Description</Text>
                    <Text style={styles.desText}>
                        {classData[0]?.description}
                    </Text>


                    <LinearGradient colors={['#F7DBA7', '#F0AB86']} style={styles.DetailContainer}>

                        <Text style={styles.des}>Class Deatail</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <MaterialIcons name="date-range" size={20} color="black" style={{ marginTop: 5 }} />
                            <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', alignSelf: 'center', fontSize: 13 }]}>
                                Start Date: {classData[0]?.startDate ? new Date(classData[0]?.startDate).toLocaleDateString('en-GB') : ''}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <MaterialIcons name="date-range" size={20} color="black" style={{ marginTop: 5 }} />

                            <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', alignSelf: 'center', fontSize: 13 }]}>
                                End Date  : {classData[0]?.endDate ? new Date(classData[0]?.startDate).toLocaleDateString('en-GB') : ''}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <AntDesign name="team" size={20} color="black" style={{ marginTop: 5 }}   />
                            <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', alignSelf: 'center', fontSize: 13 }]}>
                                Student In  Class  :   {classData[0]?.numberStudent}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <FontAwesome5 name="calendar-week" size={20} color="black"  style={{ marginTop: 5 }} />
                        <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', alignSelf: 'center', fontSize: 13 }]}>
                            Number Of Week :   {classData[0]?.numberOfWeek}
                        </Text>
                        </View>
                    </LinearGradient>

                    {showButtons && (
                        <>
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
                        </>
                    )}
                </>
            )}

            {isLoading && (
                <View>
                    <View style={styles.imageBox}>
                        <ActivityIndicator size="medium" color={colors.primary} />
                    </View>
                </View>
            )}
        </ScrollView>
    );
}