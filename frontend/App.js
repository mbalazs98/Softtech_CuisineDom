import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useFonts, FiraSansCondensed_600SemiBold, FiraSansCondensed_400Regular } from '@expo-google-fonts/fira-sans-condensed';
import { AppLoading } from 'expo';
import { Button, Input, Overlay } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

//BerkshireSwash_400Regular
//FiraSansCondensed_400Regular
//FiraSansCondensed_600SemiBold

// main color: #da4167
// light blue: #e8efff
// dark blue: #6974e8


import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from './components/Search';
import Recipe from './components/Recipe';
import HomeScreen from './components/HomeScreen';
import EnterIngredients from './components/EnterIngredients';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

import { RecipeProvider } from './components/RecipeContext';

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
	
	let user = {
			name: 'Patrick',
			email: 'patrick@cuisinedom.com',
			password: 'userpass',
			token: ''
		}


	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<RecipeProvider value={user}>
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Register"
					component={Register}
					options={{
						headerShown: false
					}}
				/>
				
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						headerShown: false
					}}
				/>

				<Stack.Screen name="EnterIngredients" component={EnterIngredients} options={{ headerShown: false }} />
				<Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
				<Stack.Screen name="Recipe" component={Recipe} options={{ headerShown: false }} />
				<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
				<Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
		</RecipeProvider>
	)
}

export default App;