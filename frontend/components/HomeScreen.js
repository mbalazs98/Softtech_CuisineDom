import React, { useState, useEffect, useContext } from 'react';

import { TouchableOpacity, View, ScrollView, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Input } from 'react-native-elements';
import RecipeContext from './RecipeContext';

const HomeScreen = ({ navigation }) => {
	let { user, updateUser } = useContext(RecipeContext);
	const [stateQuery, setStateQuery] = useState("")
	const [searchInputRef, setSearchInputRef] = useState(React.createRef());
	const [stateStyles, setStateStyles] = useState({
		labelStyle: {
			fontFamily: "FiraSansCondensed_400Regular",
			fontWeight: '400',
			color: '#fff',
			fontSize: 20,
			position: 'absolute',
			// transform: "translate(-50%, -50%)",
			top: 10, left: 60
		},
		searchBtnContainer: {
			
		}
	})
	//const [authDataJson, setAuthDataJson] = useState(null)
	const initAuthToken = async () => {
		console.log('user ', user)
		try {
			const authData = await AsyncStorage.getItem('authentication_data');
			if (authData !== null) {
				console.log(authData);
				const authDataJson = JSON.parse(authData);
				return authDataJson;
			}
			else {
				navigation.navigate('Login')
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	useFocusEffect(
		React.useCallback(() => {
			initAuthToken();
			console.log("state Query", stateQuery)
		}));

	function onPressEnterIngredients() {
		console.log('enter ingredients button')
		navigation.navigate('EnterIngredients')
	}

	function resetQueryProps() {
		console.log('reset query props')
		searchInputRef.current.input.clear()
		updateUser({});
		setStateQuery('');
	}

	const onPressMenu = async () => {
		console.log('menu button')
		const authDataJson = await initAuthToken();
		if (Object.keys(user).length === 0 && user.constructor === Object) {
			let api = 'http://10.40.255.123:8000/user/'
			fetch(`http://127.0.0.1:8000/user/`, {
			//fetch(api, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Requested-With': 'XMLHttpRequest',
					'Authorization': 'Token ' + authDataJson.token
				}
			}).then(data => {
				status = data.status;
				return data.json()
			}).then(data => {
				if (status == 200) {
					console.log("success")
					console.log(data);
					updateUser({
						'name': data.username,
						'image': data.profile_picture,
						'email': data.email
					});
					navigation.navigate('Profile', {
						resetQuery: resetQueryProps
					})

				} else {
					console.log("ERR")
				}
			}).catch(err => console.log('here', err))
		} else {
			navigation.navigate('Profile', {
				resetQuery: resetQueryProps
			})

		}
	}

	function onPressSearchBtn() {
		
		let api = `http://10.40.255.123:8000/recipes/${stateQuery}/search`;
		if(stateQuery.length > 0) {
			//fetch(api)
			fetch(`http://127.0.0.1:8000/recipes/${stateQuery}/search`)
			.then((response) => response.json())//.then(data => console.log(data))
			.then(data => {
				console.log(data)
				navigation.navigate('Search', {
					searchQuery: stateQuery,
					results: data
				})
			})
		}		
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/bg.jpg')} style={styles.backgroundImage}>
				<View style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} ></View>

				<TouchableOpacity onPress={onPressMenu} style={{ position: 'absolute', left: 10, top: 0 }}>

					<Image source={require('../assets/menu_dots.png')} style={styles.menuDots} />
				</TouchableOpacity>
				<Image source={require('../assets/logo2.png')} style={styles.image} />
				<Button buttonStyle={styles.enterBtn}
					onPress={onPressEnterIngredients}
					title="Enter Ingredients"
					titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
					accessibilityLabel="Enter Ingredients Button" />
				<Text style={{ width: 260, height: 20 }}></Text>
				<View style={{ position: 'relative', width: 260 }}>
					<Input
						onChangeText={(val) => setStateQuery(val)}
						ref={searchInputRef}
						inputContainerStyle={styles.searchInputContainer}
						inputStyle={styles.searchInput}
						containerStyle={styles.searchContainer}
						// placeholder="Search Recipes"
						// onFocus={onFocusSearchBtn}
						label=""
						labelStyle={stateStyles.labelStyle}
						accessibilityLabel="Search Recipes Input" />
					<Text style={{ width: 260, height: 20 }}></Text>

					<Button buttonStyle={styles.searchBtn}
						containerStyle={stateStyles.searchBtnContainer}
						onPress={onPressSearchBtn}
						title="Search Recipes"
						titleStyle={{ fontFamily: "FiraSansCondensed_400Regular", fontSize: 20 }}
						accessibilityLabel="Search Recipes Button" />
				</View>
			</ImageBackground>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	image: {
		width: 170,
		height: 115,
		marginTop: 100,
		resizeMode: 'contain',
		marginBottom: 125

	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		alignItems: 'center'
	},
	enterBtn: {
		color: '#fff',
		backgroundColor: "#da4167",
		paddingLeft: 50,
		paddingRight: 50,
		paddingTop: 15,
		paddingBottom: 15,
		borderRadius: 15,
		width: 260,

	},
	searchBtn: {

		backgroundColor: '#6974e8',
		// borderColor: 'rgba(232,240,255,0.4)',
		// borderWidth: 1,
		width: 230,
		paddingLeft: 50,
		paddingRight: 50,
		paddingTop: 15,
		paddingBottom: 15,
		borderRadius: 15,
		alignSelf: 'center'
	},

	searchContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		borderColor: 'rgba(232,240,255,0.4)',
		borderWidth: 1,
		width: 260,
		borderRadius: 15,
		padding: 0,

	},
	searchInput: {
		// backgroundColor: 'pink'
		color: '#fff',
		//outlineWidth: 0,
		fontSize: 20

	},
	searchBtnContainer: {
		
	},
	searchInputContainer: {
		borderWidth: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		// backgroundColor: 'green'
	},
	menuDots: {
		width: 70,
		height: 70,
		marginTop: 30
	}

})

export default HomeScreen;