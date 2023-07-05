import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'BottamTab',
                            //   params: {}
                        },
                    ],
                }));
        }, 2000);
    });

    return (
        <LinearGradient
            colors={['#00B4DB', '#0083B0']}
            start={{ x: 0.7, y: 0 }}
            style={{
                flex: 1,
                backgroundColor: Colors.PRIMARY_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <StatusBar
                backgroundColor={Colors.TRANSPARENT}
                barStyle={"light-content"}
                translucent={true}
            />

            {/* <Image
                resizeMode='cover'
                source={require("../../assets/imges/logo.png")}
                style={{
                    width: hp(15),
                    height: hp(15),
                    tintColor: Colors.WHITE,
                    marginTop: hp(36),
                }}
            /> */}
            <Text
                style={{
                    marginTop: hp(3),
                    fontSize: hp(4.2),
                    fontWeight: '600',
                    color: Colors.WHITE_TEXT_COLOR,
                }}>Location Provider</Text>
        </LinearGradient>
    )
}

export default SplashScreen