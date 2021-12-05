import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'


export default function AlbumList({ item, apikey, navigation }) {
    const [imgUrl, setImgUrl] = useState('')


    useEffect(() => {
        const fetchImages = async () => {
            const products = await fetch(`${item.links.images.href}?apikey=${apikey}`)
            const productsJson = await products.json()
            setImgUrl(productsJson['images'][0]['url'])
        }
        fetchImages() //
    }, [])

    function parseISOString(date) {
        var actual = date.split('+');
        var dateOutput = [];
        var d = new Date(actual[0]);
        var inUtc = d.getUTCDate();
        dateOutput.push(inUtc);
        inUtc = d.getUTCMonth();
        dateOutput.push(inUtc + 1);
        inUtc = d.getUTCFullYear();
        dateOutput.push(inUtc);
        var months = { 1: 'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR', 5: 'MAY', 6: 'JUN', 7: 'JUL', 8: 'AUG', 9: 'SEP', 10: 'OCT', 11: 'NOV', 12: 'DEC' };
        return `${months[dateOutput[1]]} ${dateOutput[2]}`
    }

    return (
        <TouchableOpacity style={{ height: 250, width: '100%', alignItems: 'center', alignSelf: 'center', backgroundColor: 'white' }}
            onPress={() => navigation.navigate('AlbumDetails', { item: item, img: imgUrl, apikey: apikey })}   >
            <Image source={{ uri: imgUrl }}
                style={{ height: '70%', width: '50%', borderRadius: 10, marginTop: 10, marginLeft: 10 }}
            ></Image>
            {/* <View style={{position:'absolute',bottom:70,marginLeft:15}}>
            <Text style={{color:'white'}}>By {item.artistName}</Text>
        </View> */}

            <View style={{ marginLeft: 15, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginHorizontal: 5 }} numberOfLines={1}><Text style={{ fontSize: 14, fontWeight: 'normal' }}>by </Text> 
                    {item.artistName.length < 22
                        ? `${item.artistName}`
                        : `${item.artistName.substring(0, 20)}...`}
                    </Text>
                    <Text style={{ fontSize: 13,color: 'gray', textDecorationLine: 'underline' }}>{parseISOString(item.released)}</Text>
                </View>
                <Text style={{ textAlign: 'center', }}>{item.trackCount} tracks</Text>
            </View>
        </TouchableOpacity>
    )

}
