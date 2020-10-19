import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
	const [stateQuery, setStateQuery] = useState("")
	const [stateStyles, setStateStyles] = useState({
		labelStyle: {
			fontFamily: "FiraSansCondensed_400Regular",
			fontWeight: '400',
			color: '#fff',
			fontSize: 20,
			position: 'absolute',
			transform: "translate(-50%, -50%)",
			top: "50%", left: "50%"
		},
		searchBtnContainer: {
			display: 'none'
		}
	})

	function onPressEnterIngredients() {
		console.log('enter ingredients button')
	}

	function onFocusSearchBtn() {
		setStateStyles({
			labelStyle: {
				display: 'none'
			},
			searchBtnContainer: {
				display: 'block'
			}
		})
	}

	function onPressSearchBtn() {
		console.log(stateQuery)
		fetch(`http://127.0.0.1:5000/v1/recipes/${stateQuery}`)
			.then((response) => response.json())//.then(data => console.log(data))
			.then(data => {
				navigation.navigate('Search', {
					searchQuery: stateQuery,
					results: data.results
				})
			})
	}

	function onSearchChange(e) {
		setStateQuery(e.target.value)
	}
	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/bg.jpg')} style={styles.backgroundImage}>
				<div style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
				<Image source={require('../assets/logo2.png')} style={styles.image} />
				<Button buttonStyle={styles.enterBtn}
					onPress={onPressEnterIngredients}
					title="Enter Ingredients"
					titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
					accessibilityLabel="Enter Ingredients Button" />
				<Text style={{ width: 260, height: 20 }}></Text>
				<View style={{ position: 'relative', width: 260 }}>
					<Input
						onChange={onSearchChange}

						inputContainerStyle={styles.searchInputContainer}
						inputStyle={styles.searchInput}
						containerStyle={styles.searchContainer}
						// placeholder="Search Recipes"
						onFocus={onFocusSearchBtn}
						label="Search Recipes"
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
		outlineWidth: 0,
		fontSize: 20

	},
	searchBtnContainer: {
		display: 'none'
	},
	searchInputContainer: {
		border: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		// backgroundColor: 'green'
	}

})

export default HomeScreen;