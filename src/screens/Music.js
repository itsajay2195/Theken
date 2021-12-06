import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Audio } from 'expo-av';


export default function Music(props) {
    const { item } = props.route.params;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(props.route.params.item.index - 1);
    const [currentAudioInfo,setCurrentAudioInfo] = useState(item.name);
    




    useEffect(() => {
        if (playbackObject === null) {
          setPlaybackObject(new Audio.Sound());
        }
      }, []);
    
       const handleAudioPlayPause = async (previewUrl,index) => {
        if (playbackObject !== null && playbackStatus === null) {
          const status = await playbackObject.loadAsync(
            { uri: previewUrl },
            { shouldPlay: true }
          );
          setIsPlaying(true);
          return setPlaybackStatus(status);
        }
    
        // It will pause our audio
        if (playbackStatus.isPlaying) {
          const status = await playbackObject.pauseAsync();
          setIsPlaying(false);
          return setPlaybackStatus(status);
        }
    
        // It will resume our audio
        if (!playbackStatus.isPlaying) {
          const status = await playbackObject.playAsync();
          setIsPlaying(true);
          return setPlaybackStatus(status);
        }
      };
    const playNext = async () => {
        // setPlaybackObject(new Audio.Sound())
        if (playbackObject !== null && playbackStatus === null) {
            const status = await playbackObject.loadAsync(
                { uri: props.route.params.allTracks[currentAudioIndex + 1].previewURL },
                { shouldPlay: true }
            );
            
            setCurrentAudioIndex(currentAudioIndex + 1)
            setCurrentAudioInfo(props.route.params.allTracks[currentAudioIndex + 1].name)
            setIsPlaying(true);
            return
        }  
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg' }}
                    style={styles.albumImage}
                ></Image>
            </View>

            {/* <View style={{ alignSelf: 'center'}}>
                    <Text>Hi</Text>
            </View> */}


            <View style={{ flex: 1, height: 200 }}>
                <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text>{currentAudioInfo}</Text>
                </View>

                <View style={{ flex: 1, bottom: 150, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="skip-previous" size={40} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleAudioPlayPause(item.previewURL,item.index - 1)} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name={isPlaying ? "pause" : "play"} size={40} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => playSong(item.playSong)} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="fast-forward" size={40} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => playNext()} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="skip-forward" size={40} color="black" />
                    </TouchableOpacity>
                </View>

                {/* arrow-right-thick */}


            </View>




        </View>
    )
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    albumImage: {
        alignSelf: 'center',
        bottom: - Dimensions.get('window').height / 6,
        height: '80%',
        width: '50%',
        borderRadius: 10,
    },
})