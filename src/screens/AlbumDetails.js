import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, FlatList } from 'react-native'
import SongsList from '../components/albumDetails/SongsList'
import LottieView from 'lottie-react-native'


export default function AlbumDetails(props) {
    const { item, img, apikey } = props.route.params
    const [tracks, setTracks] = useState([])
    const [loader,setLoader] = useState(false)

    const getTracksForTheAlbum = () => {
        let url = `https://api.napster.com/v2.2/albums/${item.id}/tracks?apikey=${apikey}`
        return fetch(url)
            .then(res => res.json())
            .then(json => setTracks(json.tracks))//fetches the track list from the api 
    }

    useEffect(() => {
        setLoader(true)
        getTracksForTheAlbum()
        setTimeout(() => {
            setLoader(false)
        }, 3000);
    }, [])


    return (
        <View style={styles.container}>
            {console.warn(tracks)}
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <Image source={{ uri: img }}
                    style={styles.albumImage}
                ></Image>
            </View>

            <View style={{ flex: 4, }}>
                <View style={styles.albumTitleContainer}>
                    <Text numberOfLines={2} style={styles.albumTitle} >{item.name}</Text>
                    <Text style={{textAlign:'center',color:'gray'}}>{item.trackCount} tracks</Text>
                </View>

                <View style={{ flex:1,marginHorizontal: '15%', marginTop: 20 }}>
                {
                    loader ?
                        <View style={{alignSelf:'center'}}>
                            <LottieView
                            autoSize
                            style={{ height: Dimensions.get('window').height / 2 }}
                            source={require("../assets/animations/tracks.json")}
                            autoPlay
                            speed={0.5}
                        />
                        </View>
                        


                        :
                    <FlatList
                        data={tracks}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <SongsList item={item} apikey={apikey} />}
                        keyExtractor={item => item.id}
                    />
            }
                </View>

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
        position: 'absolute',
        bottom: -70,
        height: '100%',
        width: '40%',
        borderRadius: 10,
    },
    albumTitleContainer: {
        marginTop: 80,
        alignSelf: 'center'
    },
    albumTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})