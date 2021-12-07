import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions,SafeAreaView} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Audio } from 'expo-av';
import TrackPlayer, {
    State,
    usePlaybackState,
    useProgress, useTrackPlayerEvents
} from 'react-native-track-player';
import Slider from '@react-native-community/slider'
import { HeaderBackButton } from '@react-navigation/stack';





const setupPlayer = async (tracks,index) => {
    const allTracks = tracks.map((item, index) => {
        return {
            url: item.previewURL,
            title: item.name,
            artist: item.artistName,
            duration: item.playbackSeconds
        }
    })
   
    console.warn('index is',index)
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(allTracks);
    await TrackPlayer.skip(index)

}

const togglePlayback = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(State.Paused, playbackState)
    if(currentTrack !== null) {
        if(playbackState == State.Paused){
            await TrackPlayer.play();
        }else{
            await TrackPlayer.pause();
        }
        
    }

}



export default function Music({navigation,...props}) {
    
    const { item, allTracks } = props.route.params;
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [index, setIndex] = useState(props.route.params.item.index-1);
    const [tracks, setTrack] = useState(null);

    

    
    const minutesConverter = (time) => {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        if (seconds > 40) {
            seconds = '00';
        }
        return minutes +':'+seconds;
    }

    const skipNext= async() => {
        let trackId = await TrackPlayer.getCurrentTrack();
        setIndex(trackId + 1)
        await TrackPlayer.skip(trackId + 1)
    }

    const skipPrevious= async() => {
        let trackId = await TrackPlayer.getCurrentTrack();
        setIndex(trackId - 1)
        await TrackPlayer.skip(trackId - 1)
    }

    const forward = async(index)=>{
        await TrackPlayer.seekTo(index)
    }
    const reset = async () => {
        await TrackPlayer.stop();
        navigation.navigate('Album')
        await TrackPlayer.setupPlayer();
    }

    useEffect(() => {
        setupPlayer(allTracks,index);
    }
    , []);

    
    return (

        <View style={styles.container}>

           
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <MaterialCommunityIcons onPress={()=>reset()} name="arrow-left" size={25} color="white" />
                    <Text style={{color:'white', fontSize:20, fontWeight:'700'}}>Now Playing</Text>
                    <Text style={{color:'white'}}></Text>
                </View>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg' }}
                        style={styles.albumImage}
                    ></Image>
            </SafeAreaView>
            
            <View style={{ flex: 1}}>
                <View style={{marginTop:'10%',  justifyContent:'center', alignItems:'center' }}>
                    <Text style={{fontSize:25,fontWeight:'700'}}>{allTracks[index].name}</Text>
                    <Slider 
                        style={{ width: 350,height:20,marginTop:20,flexDirection:'row' }}
                        value={progress.position}
                        maximumValue={allTracks[index].playbackSeconds}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor='white'
                        minimumTrackTintColor='black'
                        maximumTrackTintColor='black'
                        onSlidingComplete={async(value)=> 
                           await TrackPlayer.seekTo(value)}
                        />
                </View>

                <View style={{marginHorizontal:20,flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                        <Text>
                            {new Date(progress.position * 1000).toISOString().substr(14,5)}
                        </Text>
                        <Text>{ minutesConverter(allTracks[index].playbackSeconds)}</Text>

                    </View>
                

                <View style={{  flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity onPress={()=> index - 1 < 0 ? null : skipPrevious()} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="skip-previous" size={40} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>togglePlayback(playbackState)} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name={playbackState == State.Playing ? "pause" : "play"} size={40} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => forward(progress.position + 5)} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="fast-forward" size={40} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>{index + 1 == allTracks.length ? null : skipNext()}} style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
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
        marginTop:'20%',
        height: '60%',
        width: '50%',
        borderRadius: 10,
    },
})