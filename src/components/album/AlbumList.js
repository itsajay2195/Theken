import React,{useEffect,useState} from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'


export default function AlbumList({item,dummy,apikey}) {
    var imgUrl = ''
    

    useEffect(() => {
        async function getAlbumImage ()  {
        let napsterurl = `${dummy.links.images.href}?apikey=${apikey}`;
        let response = await fetch(napsterurl)
            response = await res.json()
            console.console.warn(response);
          }
        getAlbumImage() //
    }, [])


    return (
        <TouchableOpacity style={{height:250,backgroundColor:'white'}} >
              {console.warn('imgurl is',imgUrl)}
            <Image source={{ uri:'http://static.rhap.com/img/170x170/2/3/7/6/26586732_170x170.jpg'}}
            style={{ height: '70%', width: '90%',borderRadius:10,marginTop:10,marginLeft:10 }}
        ></Image>
        <View style={{position:'absolute',bottom:70,marginLeft:15}}>
            <Text style={{color:'white'}}>By {item.artistName}</Text>
        </View>

        <View style={{marginLeft:15,paddingTop:10}}>
            <Text style= {{fontSize: 20, fontWeight: '700' }}>{item.name}</Text>
            <Text>{item.trackCount} tracks</Text>
        </View>
        </TouchableOpacity>
    )
}
