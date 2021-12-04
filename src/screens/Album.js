import React from 'react'
import { View, Text, SafeAreaView, Platform,FlatList } from 'react-native'
import Header from '../components/Header'

export default function Album() {
    return (
        // flex:0 is used to make the screen full and hide the bootom of the safeareaview
        // or we can skipp mentioning the flex property itself
        <SafeAreaView style={{ borderRadius: 20, backgroundColor: 'white', flex: 0, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
            {/* Platform.OS === "android" ? StatusBar.currentHeight : 0 = this piece of code is just to ensure that the header is not misplaced on devices with knotch */}
            <View style={{ marginHorizontal: 10, backgroundColor: 'white', height: 150 }}>
                <Header></Header>
            </View>
            <View style={{ height: '100%', backgroundColor: '#F0F3F4' }}>
                <View style={{ margin: 30 }}>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>Albums </Text>
                    <FlatList></FlatList>
                </View>

            </View>

        </SafeAreaView>
    )
}
//backgroundColor: 'pink',