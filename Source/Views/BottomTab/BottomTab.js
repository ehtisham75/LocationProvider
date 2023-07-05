import React from 'react'
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../Assets/Color/Colors';
// -----------------------
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Home from '../Location/Home';
import LiveLocation from '../Location/LiveLocation';

import Ionicons from 'react-native-vector-icons/Ionicons';

const GetRoutes = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route)
    console.log("========&&&&&&&&& ", routeName)
    if (routeName?.includes("ShortVideos")) {
        return "none";
    }
    return "flex";
}

const BottamTab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: hp(8),
                    backgroundColor: Colors.SECONDARY_COLOR,
                }
            }}>

            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={{
                                fontSize: hp(1.7),
                                color: focused ? Colors.WHITE_TEXT_COLOR : Colors.GRAY,
                                top: -5,
                                fontWeight: '700',
                                // fontFamily: "JosefinSans-Medium",
                                // backgroundColor: 'plum',
                            }}>{focused ? "Home" : "Home"}</Text>)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    size={25}
                                    color={focused ? Colors.WHITE : Colors.GRAY}
                                />
                            </>
                        )

                    },
                }}
            />

            <Tab.Screen name="LiveLocation" component={LiveLocation}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={{
                                fontSize: hp(1.7),
                                color: focused ? Colors.WHITE_TEXT_COLOR : Colors.GRAY,
                                top: -5,
                                fontWeight: '700',
                                // fontFamily: "JosefinSans-Medium",
                                // backgroundColor: 'plum',
                            }}>{focused ? "Location" : "Location"}</Text>)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <Ionicons
                                    name={focused ? "location" : "location-outline"}
                                    size={25}
                                    color={focused ? Colors.WHITE : Colors.GRAY}
                                />
                            </>
                        )
                    },
                }}
            />

        </Tab.Navigator >
    )
}

export default BottamTab