import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Platform, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import Header from '../components/Header'
import AlbumList from '../components/album/AlbumList'
import LottieView from 'lottie-react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const api_key = 'MDY2ZGZlODItMjQxZC00ZmMzLWI1MzAtYjVkMTcwZTYyZDhm'

export default function Album({navigation}) {

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [flatListloader, setFlatListLoader] = useState(false)
    const albumsList = useSelector((state) => state.albumReducer.albums)
    const [offSet, setOffSet] = useState(20)
    const napsterurl = `https://api.napster.com/v2.2/albums/top?apikey=${api_key}&limit=20&offset=${offSet}`;

    const getTopAlbumsFromNapster = (url) => {

        return fetch(url)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_ALBUM_SUCCESS',
                    payload: json.albums
                }))//fetches the data from the api and dispatches the action to the reducer
    }



    useEffect(() => {
        setLoader(true)
        getTopAlbumsFromNapster(napsterurl);
        setTimeout(() => {
            setLoader(false)
        }, 3000);
    }, [])



    const loadMore = () => {
        setFlatListLoader(true)
        let off_count = offSet + 20;
        setOffSet(previousCount => previousCount + 20)
        const modified_url = `https://api.napster.com/v2.2/albums/top?apikey=${api_key}&limit=20&offset=${off_count}`;
        getTopAlbumsFromNapster(modified_url);
        setTimeout(() => {
            setFlatListLoader(false)
        }, 3000);

    }

    const renderFooter = () => {
        return (
            flatListloader?
            <View style={{ alignItems: 'center' }}>
                <ActivityIndicator size="small" color="black" />
            </View>:null
        )


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 10, backgroundColor: 'white', height: 150 }}>
                <Header></Header>
            </View>
            <View style={{ backgroundColor: '#F0F3F4' }}>
                <Text style={{ fontSize: 25, fontWeight: '700', marginHorizontal: 30, paddingVertical: 10 }}>Albums </Text>
            </View>


            <View style={{ flex: 1, margin: 5, alignSelf: 'center' }}>
                {
                    loader ?

                        <LottieView
                            style={{ height: Dimensions.get('window').height / 2 }}
                            source={require("../assets/animations/music-spectrum.json")}
                            autoPlay
                            speed={0.5}
                        />


                        :

                        <FlatList
                            data={albumsList}
                            renderItem={({ item }) => <AlbumList item={item} apikey={api_key} navigation={navigation} />}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            onEndReached={loadMore}
                            onEndReachedThreshold={0}
                            ListFooterComponent={renderFooter}
                        />


                }

            </View>


        </SafeAreaView>


    )
}
