import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../../Assets/Color/Colors'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const LiveLocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
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
    }, []);


    return (
        <View style={{
            flex: 1,
        }}>
            <StatusBar
                backgroundColor={Colors.SECONDARY_COLOR}
                barStyle={"light-content"}
                translucent={false}
            />
            <Text>LiveLocation</Text>

            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: currentLocation?.latitude || 0,
                        longitude: currentLocation?.longitude || 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                        />
                    )}
                </MapView>
            </View>
        </View>
    )
}

export default LiveLocation