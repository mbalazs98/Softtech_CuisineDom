import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const SearchItem = ({itemID, itemName, itemThumb, itemDescription, navigation}) => {
    // console.log(`../assets/${itemThumb}.png`)
    
	const [image, setImage] = useState(require('../assets/food_placeholder.png'));
	
	const checkImageURL = async (url) => {
		try {
			await fetch(url) 
				.then(res => {
				if(res.status == 200){
					console.log(url)
				setImage(url) 
				}
				})
		//.catch(err=>{setImage('../assets/food_placeholder.png') })
		}
		catch (error) {
			console.log(error);
			setImage(require('../assets/food_placeholder.png'));
		}
	}
	
	useFocusEffect(
		React.useCallback(() => {
		  checkImageURL(itemThumb);
    }))
	
	const getAuthData = async () => {
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
	
    const onPressSearchItem = async () => {
        console.log(itemID)
		const authDataJson = await getAuthData();
		fetch(`http://127.0.0.1:8000/recipes/${itemID}/recipeID`, {
			method: 'GET',
			//credentials: 'same-origin',
			headers: {
			//"X-CSRFToken": Cookies.get("csrftoken"),
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Token '+authDataJson.token 
			}
		})
			.then((response) => response.json())//.then(data => console.log(data))
			.then(data => {
                console.log(data)
				navigation.navigate('Recipe', {
					recipeID: data['recipe_id'],
					recipeName: data['recipe_name'],
					recipeThumb: data['image'],
					recipeTime: data['prep_time'],
					recipeServing: data['serving'],
					recipeIngredients: data['string_ingredients']!=undefined? data['string_ingredients']: ' No ingredients available. ',
					recipeDescription: data['cooking_method']!=undefined? data['cooking_method']: '  No description available.  '
				})
			})
        /*navigation.navigate('Recipe', {
            recipeID: itemID,
            recipeName: itemName,
            recipeThumb: itemThumb,
            recipeDescription: itemDescription
        })*/
    }
    return (
        <TouchableOpacity onPress={onPressSearchItem}>
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={{fontFamily: 'FiraSansCondensed_600SemiBold', fontSize: 20, paddingTop: 10, paddingBottom: 5}}>{itemName}</Text>
        </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({  
    image: {
		width: 120,
        height: 120,
        backgroundColor: '#fff',
		// marginTop: 100,
        resizeMode: 'cover',
        borderRadius: 7,
		// marginBottom: 125
       // boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)'
    },
    card: {
        backgroundColor: '#e8efff',
        padding: 10,
        width: 140,
        borderRadius: 10,
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',
        marginLeft: 7.5,
        marginRight: 7.5,
        marginBottom: 30
    }
})

// main color: #da4167
// light blue: #e8efff
// dark blue: #6974e8
export default SearchItem;