import React,{useEffect} from 'react'
import { View, Text, SafeAreaView, Platform, FlatList } from 'react-native'
import Header from '../components/Header'
import AlbumList from '../components/album/AlbumList'

const api_key='MDY2ZGZlODItMjQxZC00ZmMzLWI1MzAtYjVkMTcwZTYyZDhm'
const Data = [
    {
        "type": "album",
        "id": "alb.245806615",
        "upc": "602557261684",
        "shortcut": "post-malone/stoney-deluxe",
        "href": "https://api.napster.com/v2.2/albums/alb.245806615",
        "name": "Stoney (Deluxe)",
        "released": "2016-12-09T00:00:00.000Z",
        "originallyReleased": "2016-12-09T00:00:00.000Z",
        "label": "Universal Records",
        "copyright": "℗ 2016 Republic Records, a division of UMG Recordings, Inc.",
        "discCount": 1,
        "trackCount": 18,
        "artistName": "Ed Sheeran"
    }, 
    {
        "type": "album",
        "id": "alb.245806615",
        "upc": "602557261684",
        "shortcut": "post-malone/stoney-deluxe",
        "href": "https://api.napster.com/v2.2/albums/alb.245806615",
        "name": "Stoney (Deluxe)",
        "released": "2016-12-09T00:00:00.000Z",
        "originallyReleased": "2016-12-09T00:00:00.000Z",
        "label": "Universal Records",
        "copyright": "℗ 2016 Republic Records, a division of UMG Recordings, Inc.",
        "trackCount": 18,
        "artistName": "Post Malone",
    }
]



const renderItem = ({ item }) => {
    return (
      <AlbumList item={item} />
    );}

export default function Album() {

    const getTopAlbumsFromNapster = () => {
        const napsterurl = `https://api.napster.com/v2.2/albums/top?apikey=${api_key}&offset=20`;
        return fetch(napsterurl)
        .then(res => res.json())
        .then(json => setRestaurantData(json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase()))))//setRestaurantData(json.businesses)
    }
    
    // useEffect(() => {
    //     getRestaurantsFromYelp();
    // }, [])// this hook will execute whenever the value of the state "City" and "activeTab"is changed.
    
    
    return (
        // flex:0 is used to make the screen full and hide the bootom of the safeareaview
        // or we can skipp mentioning the flex property itself
        <SafeAreaView style={{ borderRadius: 20, backgroundColor: 'white', flex: 0, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
            {/* Platform.OS === "android" ? StatusBar.currentHeight : 0 = this piece of code is just to ensure that the header is not misplaced on devices with knotch */}
            <View style={{ marginHorizontal: 10, backgroundColor: 'white', height: 150 }}>
                <Header></Header>
            </View>
            
            <View style={{ backgroundColor: '#F0F3F4' }}>
                <View style={{ marginHorizontal: 30,paddingVertical:10 }}>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>Albums </Text>
                    
                </View>
            </View>

            <View style={{margin:5,alignSelf:'center'}}>
                        <FlatList
                            data={Data}
                            renderItem={({ item }) => <AlbumList item={item}  />}
                            keyExtractor={item => item.artistName}
                        />
            </View>

        </SafeAreaView>
    )
}
//backgroundColor: 'pink',