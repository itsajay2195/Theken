import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'



export default function HeaderTabs() {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: 'https://media.istockphoto.com/photos/man-portrait-in-black-and-white-picture-id1135480451?k=20&m=1135480451&s=612x612&w=0&h=I5hnIg8uOr2DWixwQo-q0R5Nvp5Fuwru6IiV0GX-5BY=' }} style={{ width: 40, height: 40, borderRadius: 5 }}></Image>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'gray' }}>Welcome</Text>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>Ajaykumar Rajasekaran</Text>
                    </View>
                </View>

                <Text></Text>
            </View>

            <View style={{ marginHorizontal:20}}>
                <Text style={{fontSize:25,fontWeight:'700'}}>Let the Music </Text>
                <Text style={{fontSize:25,fontWeight:'700'}}>Take you away </Text>
            </View>
        </View>

    )
}

