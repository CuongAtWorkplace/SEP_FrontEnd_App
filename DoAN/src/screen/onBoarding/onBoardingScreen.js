import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import onboardingData from '../../onboardingData';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
    const [currentId, setCurrentId] = useState(0);
    const swiperRef = useRef(null);
    const navigation = useNavigation();


    useEffect(() => {
        // Xử lý khi currentId thay đổi
        console.log('Current ID:', currentId);
    }, [currentId]);

    const handleNextPage = () => {
        swiperRef.current.scrollBy(1);
    };

    const handleSetting = () => {
        navigation.navigate('Setting')
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <View style={styles.image}>
                <LottieView
                    source={item.lottie}
                    autoPlay
                    loop
                />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            {item.id === 3 ? (
                <TouchableOpacity onPress={handleSetting}>
                    <View style={{ width: 130, height: 130 }}>
                        <LottieView
                            source={require('../onBoarding/finbtn.json')}
                            autoPlay
                            loop
                        />
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleNextPage}>
                    <View style={{ width: 100, height: 100 }}>
                        <LottieView
                            source={require('../onBoarding/nextbtn.json')}
                            autoPlay
                            loop
                        />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <Swiper
            ref={swiperRef}

            showsPagination={true}
            activeDotColor="black"
            style={{ backgroundColor: 'white' }}
        >
            {onboardingData.map((item) => (
                <View key={item.id} style={{ flex: 1 }}>
                    {renderItem({ item })}
                </View>
            ))}
        </Swiper>


    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        display: 'flex',
        width: '100%',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    description: {
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        zIndex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },
});

export default OnboardingScreen;
