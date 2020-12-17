import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const Recipe = ({ route, navigation }) => {
    var x = 1
    const [image, setImage] = useState('../assets/food_placeholder.png');
    const [prepTime, setPrepTime] = useState("");
	const [fav, setFav] = useState(0);

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
	
    function onPressBackToSearch() {
        //navigation.navigate('Search')
		navigation.goBack();

    }
	
	const onPressFav = async () => {
		const authDataJson = await getAuthData();
		if (fav === 0) {
			let api = 'http://10.40.255.123:8000/user/add_recipe/';

			//fetch(api, {
			await fetch(`http://127.0.0.1:8000/user/add_recipe/`, {
				method: 'POST',
				body: JSON.stringify({
					'recipe_id': route.params.recipeID
				}),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Requested-With': 'XMLHttpRequest',
					'Authorization': 'Token ' + authDataJson.token
				}
			}).then(data => {
				status = data.status;
				console.log(status)
				return data.json()
			}).then(data => {
				if (status == 200) {
					setFav(1);
					console.log(data)
				}
			}).catch(err => console.log(err))
			
		}
		else {
			
			let api = 'http://10.40.255.123:8000/user/delete_recipe/';

			//fetch(api, {
			await fetch(`http://127.0.0.1:8000/user/delete_recipe/`, {
				method: 'POST',
				body: JSON.stringify({
					'id_to_delete': route.params.recipeID
				}),
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
					setFav(0);
				}
			}).catch(err => console.log(err))
			
		}
	}
	
	

	const isFav = async () => {
		try {
			const authDataJson = await getAuthData();
			let api = `http://10.40.255.123:8000/user/is_fav/${route.params.recipeID}`
            await fetch(`http://127.0.0.1:8000/user/is_fav/${route.params.recipeID}`, {
			//await fetch(api, {
				method: 'GET',
				//credentials: 'same-origin',
				headers: {
					//"X-CSRFToken": Cookies.get("csrftoken"),
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Requested-With': 'XMLHttpRequest',
					'Authorization': 'Token ' + authDataJson.token
				}
			})
				.then((response) => response.json())//.then(data => console.log(data))
				.then(data => {
					setFav(data['is_favourite_recipe']);
				})
        }
        catch (error) {
            console.log(error);
            setFav(0);
        }
	}
	
    function validPrepTime() {
        //console.log(route.params.recipeTime.substring(route.params.recipeTime.length-7));
        if (route.params.recipeTime.substring(route.params.recipeTime.length - 7) == "minutes") {
            setPrepTime(route.params.recipeTime);
        }
        //else { console.log("No")}
    }

    const checkImageURL = async (url) => {
        try {
            await fetch(url)
                .then(res => {
                    if (res.status == 200) {
                        console.log(url)
                        setImage(url)
                    }
                })
            //.catch(err=>{setImage('../assets/food_placeholder.png') })
        }
        catch (error) {
            console.log(error);
            setImage('../assets/food_placeholder.png');
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            checkImageURL(route.params.recipeThumb);
            validPrepTime();
			isFav();
        }));

    return (

        <View style={styles.container}>
			<View>
				<TouchableOpacity style={styles.backToSearch} onPress={onPressBackToSearch}>
					<Image source={require('../assets/arrow.png')} style={styles.icon} />
					<Text style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 26, fontFamily: 'FiraSansCondensed_400Regular' }}>Back to search results</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressFav} style={{ position: 'absolute', right: 10 }}>
					<Image source={fav === 1 ? require('../assets/fav_yes.png') : require('../assets/fav_no.png')} style={styles.icon} />
				</TouchableOpacity>
			</View>

            <ScrollView style={styles.recipeContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={image !== '../assets/food_placeholder.png' ? { uri: image } : require('../assets/food_placeholder.png')} style={styles.image} />
                    </View>
                    <View style={styles.recipeMainInfo}>
                        <Text style={styles.recipeTitle}>{route.params.recipeName}</Text>
                        <Text style={styles.recipeTime}>Time to make: {prepTime}</Text>
                        <Text style={styles.recipeTime}>{route.params.recipeServing}</Text>
                    </View>
                </View>
                <View style={styles.recipeDescriptionContainer}>
                    <Text style={styles.recipeDescriptionTitle}>Ingredients</Text>
                    <Text style={styles.recipeDescriptionText}>{route.params.recipeIngredients.slice(1, -1).replace(/'/g, "").split(', ').map((word) => "-" + word).join('\n')}</Text>

                </View>
                <View style={styles.recipeDescriptionContainer}>
                    <Text style={styles.recipeDescriptionTitle}>Instructions</Text>
                    <Text style={styles.recipeDescriptionText}>{route.params.recipeDescription.slice(2, -2).split(/', '|", "|', "|", '/g).map((word) => x++ + ". " + word).join('\n')}</Text>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 25,
        paddingTop: 50
    },
    backToSearch: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
    },
    icon: {
        width: 36,
        height: 36,
        backgroundColor: '#fff',
        // marginTop: 100,
        resizeMode: 'contain'
    },
    recipeContainer: {
        // paddingLeft: 20,
        // paddingRight: 20,
        // paddingTop: 30,

        flexDirection: 'column',

        // backgroundColor: 'green'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 7,
        // backgroundColor: 'red'
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)'
    },
    recipeMainInfo: {
        // flex: 1,
        paddingLeft: 20,
        justifyContent: 'center',
        //overflow: 'hidden',
        // backgroundColor: 'pink',
        //height: 150
    },
    recipeTitle: {
        fontFamily: 'FiraSansCondensed_600SemiBold',
        fontSize: 32,
        paddingTop: 0,
        paddingBottom: 10,
        width: 180,
        // backgroundColor: 'red'
    },
    recipeTime: {
        fontFamily: 'FiraSansCondensed_400Regular',
        fontSize: 14,
        marginTop: 10,
        // width: 180
    },
    recipeDescriptionContainer: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#e8efff',
        padding: 20,
        borderRadius: 10,
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',
        //marginLeft: 7.5,
        //marginRight: 7.5,
        marginBottom: 15
    },
    recipeDescriptionTitle: {
        fontSize: 16,
        fontFamily: 'FiraSansCondensed_600SemiBold',
        marginBottom: 15
    },
    recipeDescriptionText: {
        fontSize: 16
    }
})

// main color: #da4167
// light blue: #e8efff
// dark blue: #6974e8
export default Recipe;