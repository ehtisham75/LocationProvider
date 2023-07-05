import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Button, TouchableOpacity, Image, PermissionsAndroid, Switch } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import Share from 'react-native-share';
import { Colors } from '../../Assets/Color/Colors'

const Home = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationPermissionEnabled, setLocationPermissionEnabled] = useState(false);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

    useEffect(() => {
        // Geocoder.init('AIzaSyBk7zQw4KVm8lLbpXpG-g1Jf7Sbg3-tJ_U');

        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                setLocationPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
            } catch (error) {
                console.log(error);
            }
        };

        if (locationPermissionEnabled) {
            requestLocationPermission();
        }
    }, [locationPermissionEnabled]);

    useEffect(() => {
        if (locationPermissionGranted) {
            Geolocation.getCurrentPosition(
                position => {
                    setCurrentLocation(position.coords);
                },
                error => { console.log(error.message) },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }, [locationPermissionGranted]);

    const shareLocationOnWhatsApp = async () => {
        if (!locationPermissionGranted) {
            console.log('Location permission not granted');
            return;
        }

        if (!currentLocation) {
            console.log('Current location not available');
            return;
        }

        const { latitude, longitude } = currentLocation;
        const url = `https://maps.google.com/?q=${latitude},${longitude}`;

        Share.open({
            title: 'Share Location',
            message: 'Check out my current location',
            url,
            failOnCancel: false,
        })
            .then(res => console.log("=== share loc Res ===", res))
            .catch(error => console.log("==== share loc catch err ====", error));


        // const db = getFirestore();
        // try {
        //     const docRef = await addDoc(collection(db, 'sharedLocations'), {
        //         address: addressString,
        //         latitude: latitude,
        //         longitude: longitude,
        //         timestamp: new Date().toISOString(),
        //     });

        //     console.log('Location stored in Firestore with ID: ', docRef.id);
        // } catch (error) {
        //     console.log('Error storing location in Firestore: ', error);
        // }
    };

    // const retrieveSharedLocations = async () => {
    //     const db = getFirestore();

    //     try {
    //         const querySnapshot = await getDocs(collection(db, 'sharedLocations'));

    //         querySnapshot.forEach(doc => {
    //             const location = doc.data();
    //             console.log('Address:', location.address);
    //             console.log('Latitude:', location.latitude);
    //             console.log('Longitude:', location.longitude);
    //             console.log('Timestamp:', location.timestamp);
    //         });
    //     } catch (error) {
    //         console.log('Error retrieving shared locations: ', error);
    //     }
    // };

    const toggleLocationPermission = () => {
        setLocationPermissionEnabled(!locationPermissionEnabled);
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
            <Text
                style={{
                    fontSize: 18,
                    color: Colors.SECONDARY_COLOR,
                    fontWeight: '600',
                    marginHorizontal: '5%',
                    textAlign: 'center',
                    marginTop: "10%",
                    backgroundColor: Colors.LIGHT_GRAY,
                    borderRadius:10,
                    paddingHorizontal:"2%",
                    paddingVertical:"2%"
                }}>Welcome to My Location Provider App</Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: "6%",
                marginTop: "3%",
            }}>
                <Text
                    style={{
                        fontSize: 16,
                        color: Colors.BLACK_TEXT_COLOR,
                        textAlign: 'center',
                    }}>Location Permission:</Text>
                <Switch
                    value={locationPermissionEnabled}
                    onValueChange={toggleLocationPermission}
                />
            </View>

            {!locationPermissionEnabled && (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text
                        style={{
                            fontSize: 20,
                            color: Colors.PRIMARY_COLOR,
                            fontWeight: '600',
                            marginHorizontal: '5%',
                            textAlign: 'center',
                        }}>Please grant location permission to share your location.</Text>
                </View>
            )}

            {locationPermissionEnabled && locationPermissionGranted && currentLocation && (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: Colors.LIGHTBLACK_TEXT_COLOR,
                            fontWeight: '600',
                            textAlign: 'center',
                            marginHorizontal: '10%',
                        }}>You can share your current location on WhatsApp</Text>

                    <TouchableOpacity
                        onPress={shareLocationOnWhatsApp}
                        style={{
                            width: "80%",
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: "3.5%",
                            marginTop: "5%",
                            backgroundColor: Colors.SECONDARY_COLOR,
                            borderRadius: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Colors.WHITE_TEXT_COLOR,
                                fontWeight: '600',
                                textAlign: 'center',
                            }}>Share Location</Text>
                    </TouchableOpacity>
                </View>
            )}

            {locationPermissionEnabled && !currentLocation && (
                <Text
                    style={{
                        fontSize: 16,
                        color: Colors.RED_TEXT_COLOR,
                        fontWeight: '600',
                        marginHorizontal: '5%',
                        textAlign: 'center',
                        marginTop: "10%",
                    }}>Location permission not granted.</Text>
            )}


        </View>
    )
}

export default Home