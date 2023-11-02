import React from 'react';
import { Image, Text, ScrollView, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
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
import myGlobalVariable from '../../global';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import User from '../../user';
import ProgressDialog from 'react-native-progress-dialog';
import { Linking } from 'react-native';
import { Modal } from 'react-native';
import ReportModal from './ReportModal';
import FeedBackModal from './FeedBackModal';

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
        color: colors.white,

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

        margin: 10,
    },
    detailText: {
        textAlign: 'justify',
        marginHorizontal: 20,
        marginTop: 5,
    },
    feeText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 20, // Điều chỉnh kích thước văn bản tùy theo nhu cầu của bạn
        textAlign: 'center', // Để canh giữa văn bản theo chiều ngang
        transform: [{ translateX: -50 }, { translateY: -50 }],
        position: 'absolute',
        top: '60%',
        left: '50%',
    },
});

export default function classDetail(props) {


    const navigation = useNavigation();

    const [showButtons, setShowButtons] = useState(false);


    const handleBack = () => {
        navigation.navigate('Home');
    };

    const ChatHandle = (id, name) => {
        navigation.navigate('ChatClass', { id: id, name: name });
    };

    const route = useRoute();
    const { classId } = route.params; // Lấy ID từ route.params

    const [classData, setClassData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [imageUrl, setImageUrl] = useState(''); // State để lưu URL hình ảnh từ API
    const [isLoading, setIsLoading] = useState(true);
    const [Enroll, setEnroll] = useState(false);
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);


    const URL = myGlobalVariable;

    const handleReportPress = () => {

        console.log("an roi");
        setIsReportVisible(true);
    };

    const handleCancelReportPress = () => {
        setIsReportVisible(false);
    };

    const handleFeedbackPress = () => {

        console.log("an roi");
        setIsFeedbackVisible(true);
    };

    const handleCancelFeedbackPress = () => {
        setIsFeedbackVisible(false);
    };


    const HandleBalance = async () => {
        setEnroll(true);
        if (UserData[0].balance >= classData[0]?.fee) {
            setEnroll(false);
            Alert.alert('Notification', 'Ok');
            try {
                const response = await fetch(URL + '/api/User/UpdateBalanceStudent/UpdateBalanceStudent/' + classData[0]?.fee + '/' + User, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Gọi HandleEnroll sau khi cập nhật thành công
                    HandleEnroll();
                } else {
                    Alert.alert('Notification', 'Something wrong !!!!');
                }
            } catch (error) {
                Alert.alert('Notification', 'Something wrong !!!!');
            }

        }
        else {
            setEnroll(false);
            Alert.alert('Notification', 'You dont have enough money');
        }
    }

    const HandleEnroll = async () => {
        try {
            setEnroll(true);
            // Dữ liệu cần gửi đến API, với các tên thuộc tính phù hợp với backend
            const dataToSend = {
                ClassId: classId, // Thay thế bằng classId thực tế
                UserId: User, // Thay thế bằng userId thực tế
            };

            const response = await fetch(URL + '/api/ListStudentClass/AddStudentsToClass/AddStudentsToClass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.status === 200) {
                setShowButtons(true);
                setEnroll(false);
                Alert.alert('Notification', 'Enroll class successfully');

            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something must wrong');
        }
    };


    const handleMeetingRoomPress = () => {
        const meetingRoomUrl = 'https://cliff-lovely-system.glitch.me/?room=room-vn-1-XU1AO32XCC-1697214817745&fbclid=IwAR2YgfqNcaExiAEQKigeH8oflSD51g8EwFqtCfReJxVQz_1dPFb4LnSuoDs';
        Linking.openURL(meetingRoomUrl);
    };

    useEffect(() => {
        async function getClassById() {
            const response = await fetch(URL + '/api/Class/GetClassById/GetClassById/' + classId);
            const JsonConvert = await response.json();
            setClassData(JsonConvert);
            const response1 = await fetch(URL + '/api/User/GetTeacherById/GetUserById/' + JsonConvert[0].teacherId);
            const JsonConvert1 = await response1.json();
            setTeacherData(JsonConvert1);
            const response2 = await fetch(URL + '/api/ListStudentClass/CheckClassExists/CheckClassExists/' + classId + '/' + User);
            const response3 = await fetch(URL + '/api/User/GetStudentById/GetStudentById/' + User);
            const JsonConvert2 = await response3.json();
            setUserData(JsonConvert2)
            if (response2.ok) {
                setShowButtons(true);
            }
            setIsLoading(false);

        }
        getClassById();
    });

    return (
        <ScrollView style={styles.container}>
            <ProgressDialog visible={Enroll} />

            {!isLoading && (
                <View style={styles.imageBox}>
                    <Image
                        style={styles.image}
                        source={{ uri: URL + '/api/Course/GetImage/GetImage/' + classData[0]?.courseId }}
                    />
                    <Text style={styles.textOnImage}>{classData[0]?.classname}</Text>

                    <Text style={styles.feeText}>Fee : {classData[0]?.fee}</Text>

                    <TouchableOpacity style={styles.Arrowback} onPress={handleBack}>
                        <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
                    </TouchableOpacity>

                    {showButtons && (
                        <View>
                            <TouchableOpacity style={[styles.actionButton, styles.report]} onPress={handleReportPress}>
                                <Text style={styles.buttonText}>Report </Text>
                                <MaterialIcons style={styles.reportIcon} name="report" size={17} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.actionButton, styles.enroll]} onPress={handleFeedbackPress}>
                                <Text style={styles.buttonText}>Feedback </Text>
                                <MaterialIcons style={{marginRight:5}} name="feedback" size={17} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                    {!showButtons && (

                        <TouchableOpacity style={[styles.actionButton, styles.enroll]} onPress={HandleBalance}>
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

                        <Text style={[styles.des, { color: colors.white }]}>Class Deatail</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <MaterialIcons name="access-time" size={20} color="black" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', fontSize: 13 }]}>
                                    Start Date: {classData[0]?.startDate ? new Date(classData[0]?.startDate).toLocaleDateString('en-GB') : ''}                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <MaterialIcons name="access-time" size={20} color="black" />
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', fontSize: 13 }]}>
                                    End Date  : {classData[0]?.endDate ? new Date(classData[0]?.startDate).toLocaleDateString('en-GB') : ''}                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <AntDesign name="team" size={20} color="black" style={{ marginTop: 5 }} />
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', fontSize: 13 }]}>
                                    Student In Class: {classData[0]?.numberStudent}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <FontAwesome5 name="calendar-week" size={20} color="black" style={{ marginTop: 5 }} />
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.gray, fontWeight: 'bold', fontSize: 13 }]}>
                                    Number Of Week :   {classData[0]?.numberOfWeek}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={['#005AA7', '#FFFDE4']} style={styles.DetailContainer}>

                        <Text style={[styles.des, { color: colors.white }]}>Teacher Information</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <FontAwesome5 name="chalkboard-teacher" size={16} color="black" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.black, fontWeight: 'bold', fontSize: 13 }]}>
                                    Teacher Name: {teacherData[0].fullName}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Feather name="phone" size={18} color="black" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.black, fontWeight: 'bold', fontSize: 13 }]}>
                                    Teacher Phone: {teacherData[0].phone}
                                </Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="gmail" size={18} color="black" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.detailText, { color: colors.black, fontWeight: 'bold', fontSize: 13 }]}>
                                    Teacher Email: {teacherData[0].email}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10, marginBottom: 10 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                <Text style={{ color: 'black', textDecorationLine: 'underline' }}>View All</Text>
                                <MaterialIcons name="navigate-next" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>

                    {showButtons && (
                        <>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => ChatHandle(classData[0]?.courseId, classData[0]?.classname)}>
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

                            <TouchableOpacity style={styles.meetingRoomContainer} onPress={handleMeetingRoomPress}>
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
            <SafeAreaView>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isReportVisible}
                    onRequestClose={() => setIsReportVisible(false)}
                >
                    <ReportModal closeModal={handleCancelReportPress} />
                </Modal>


                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isFeedbackVisible}
                    onRequestClose={() => setIsFeedbackVisible(false)}
                >
                    <FeedBackModal closeModal={handleCancelFeedbackPress} />
                </Modal>
            </SafeAreaView>
        </ScrollView>
    );
}