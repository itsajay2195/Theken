import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Album from './src/screens/Album'
import AlbumDetails from './src/screens/AlbumDetails'
import Music from './src/screens/Music'
import { Provider } from 'react-redux'
import configureStore from './src/redux/store'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const store =configureStore()

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: true,
        headerTransparent: true,

    }

    return (
        <Provider store ={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Album" screenOptions={screenOptions}>
                    <Stack.Screen name='Album' component={Album} options={{ title: '' }} />
                    <Stack.Screen
                        name='AlbumDetails'
                        component={AlbumDetails}
                        screenOptions={screenOptions}
                        options={{
                            title: '', headerBackImage: () => <MaterialCommunityIcons name="arrow-left" size={25} color="white" />,
                            headerBackTitleVisible: false
                        }} />
                    <Stack.Screen name='Music' component={Music} options={{ title: '' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>


    )
}