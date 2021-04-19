import React, {useState, useEffect, useRef } from 'react'
import {View, StyleSheet} from "react-native"
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function index(){
    const [origin, setOrigin]= useState<cordProps>();
    const [destination, setDestination]= useState(null);

interface cordProps{
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

    useEffect(()=>{
        (async function(){
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({ });
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421,
                })
            } else {
                throw new Error('Location permission not granted');
            }
        })()
    },[])

    return(
    <View style={styles.container}>

        <MapView 
            style={styles.mapa}
            initialRegion={origin}
            showsUserLocation={true}
            loadingEnabled={true}
        >
        </MapView>
        <View style={styles.menu}>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    mapa:{
        height:'80%',

    },
    menu:{
        backgroundColor: '#555',
        height:'20%'
    }
})