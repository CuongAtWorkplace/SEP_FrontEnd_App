import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import onboardingData from '../../onboardingData';

const OnboardingScreen = ({ navigation }) => {
    const [currentId, setCurrentId] = useState(0);

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

            {currentId === onboardingData.length - 1 ? (
                <TouchableOpacity style={styles.button} onPress={() => console.log('Get Started Pressed')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => setCurrentId(currentId + 1)}>
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
            showsPagination
            activeDotColor="black"
            style={{ backgroundColor: 'white' }}
            index={currentId}
            onIndexChanged={(index) => setCurrentId(index)}
        >
            {onboardingData.map((item, index) => (
                <View key={item.id} style={{ flex: 1 }}>
                    {index === currentId && renderItem({ item })}
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
