import React,{useEffect,useState} from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'


export default function AlbumList({item,apikey}) {
    const[imgUrl,setImgUrl]=useState('')
    

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await fetch(`${item.links.images.href}?apikey=${apikey}`)
            const productsJson = await products.json()
            setImgUrl(productsJson['images'][0]['url'])
          }
    
          fetchProducts() //
    }, [])


    return (
        <TouchableOpacity style={{height:250,width:'100%',alignItems:'center',alignSelf:'center',backgroundColor:'white'}} >
              {console.warn('item',item)}
            <Image source={{ uri:imgUrl}}
            style={{ height: '70%', width: '50%',borderRadius:10,marginTop:10,marginLeft:10 }}
        ></Image>
        <View style={{position:'absolute',bottom:70,marginLeft:15}}>
            <Text style={{color:'white'}}>By {item.artistName}</Text>
        </View>

        <View style={{marginLeft:15,paddingTop:10}}>
            <Text style= {{fontSize: 20, fontWeight: '700',textAlign:'center',marginHorizontal:20 }} numberOfLines={1}>{item.name}</Text>
            <Text style={{textAlign:'center'}}>{item.trackCount} tracks</Text>
        </View>
        </TouchableOpacity>
    )
}
