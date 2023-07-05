import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, PermissionsAndroid, ActivityIndicator } from 'react-native'
import { Colors } from '../../Assets/Color/Colors'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const LiveLocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    console.log('Location permission denied');
                }
            } catch (error) {
                console.log('Error requesting location permission:', error);
            }
        };

        requestLocationPermission();
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                console.log('Error getting current location:', error);
            },
        );
    };

    return (
        <View style={{
            flex: 1,
        }}>
            <StatusBar
                backgroundColor={Colors.SECONDARY_COLOR}
                barStyle={"light-content"}
                translucent={false}
            />

            {currentLocation ? (
                <View
                    style={{
                        width: "90%",
                        height: 400,
                        alignSelf: 'center',
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginTop: 20,
                    }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                        showsCompass={true}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
                    >
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                        />
                    </MapView>
                </View>
            ) :
                (<View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size={'small'} color={Colors.PRIMARY_COLOR} />
                </View>)}
        </View>
    )
}

export default LiveLocation