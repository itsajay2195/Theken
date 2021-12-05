import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SongsList({ item }) {


    const minutesConverter = (time) => {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        if (seconds > 40) { 
            minutes++;
        }
        return minutes;
    }

    return (
        <TouchableOpacity style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="play" size={40} color="black" />
                </TouchableOpacity>

                <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name.length < 18
                        ? `${item.name}`
                        : `${item.name.substring(0, 15)}...`}
                    </Text>
                    <Text style={{ color: 'gray' }}>{item.artistName}</Text>
                </View>
            </View>




            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray' }}>{minutesConverter(item.playbackSeconds)} minutes</Text>
                <MaterialCommunityIcons name="heart-outline" size={25} color="black" />
            </TouchableOpacity>




        </TouchableOpacity>
    )
}
