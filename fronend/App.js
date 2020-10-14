import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useFonts, FiraSansCondensed_600SemiBold, FiraSansCondensed_400Regular } from '@expo-google-fonts/fira-sans-condensed';
import { AppLoading } from 'expo';
import { Button, Input, Overlay } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

//BerkshireSwash_400Regular
//FiraSansCondensed_400Regular
//FiraSansCondensed_600SemiBold

import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './components/Search';
import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();

// const MyStack = () => {
// 	return (
// 		<NavigationContainer>
// 			<Stack.Navigator>
// 				<Stack.Screen
// 					name="Home"
// 					component={HomeScreen}
// 					options={{ title: 'Welcome' }}
// 				/>
// 				<Stack.Screen name="Search" component={Search} />
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	);
// };

const App = () => {
	let [fontsLoaded] = useFonts({
		FiraSansCondensed_600SemiBold,
		FiraSansCondensed_400Regular
	});

	
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}




export default App;