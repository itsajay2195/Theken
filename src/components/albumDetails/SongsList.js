import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Audio } from 'expo-av'

export default function SongsList({ item,navigation,apikey,allTracks }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [status, setStatus] = useState(null)
    const [playbackObject, setPlaybackObject] = useState(null)



    const minutesConverter = (time) => {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        if (seconds > 40) {
            minutes++;
        }
        return minutes;
    }


    const playSong = async (preview_url) => {
        // playing audio for the first time
        if (playbackObject === null) {
            const playbackInfo = new Audio.Sound()
            const status = await playbackInfo.loadAsync({ uri: item.previewURL }, { shouldPlay: true })// this returns a promise
            console.warn(status)
            setPlaybackObject(playbackInfo)
            setStatus(status)
            setIsPlaying(status.isLoaded)
            return
        }

        if (status.isLoaded) {
            // if the audio is already loaded, and it is playing
            const status = await setPlaybackObject(playbackObject.setStatusAsync({ shouldPlay: false }))
            setStatus(status)
            setIsPlaying(false)
            setPlaybackObject(null)
            return
        }

    }

    const navigateToMusicScreen =async ()=>{
        navigation.navigate("Music",{item:item,apikey:apikey,allTracks:allTracks})
        const status = await setPlaybackObject(playbackObject.setStatusAsync({ shouldPlay: false }))
        setStatus(status)
        setIsPlaying(!isPlaying)
        setPlaybackObject(null)
        

    }
    return (
        <TouchableOpacity onPress={()=>navigateToMusicScreen()} style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => playSong(item.previewURL)} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name={isPlaying ? "pause" : "play"} size={40} color="black" />
                </TouchableOpacity>

                <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name.length < 18
                        ? `${item.name}`
                        : `${item.name.substring(0, 15)}...`}
                    </Text>
                    <Text style={{ color: 'gray' }}>{item.artistName}</Text>
                </View>
            </View>


            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray' }}>{minutesConverter(item.playbackSeconds)} minutes</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="heart-outline" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
