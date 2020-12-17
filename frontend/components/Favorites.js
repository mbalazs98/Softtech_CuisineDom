import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import SearchItem from './SearchItem';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Favorites = ({ navigation }) => {
	const [results, setResults] = useState([]);

    function onPressBackBtn() {
        navigation.goBack();
    }
	
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

	const onPressedFavBtn = async () => {
		const authDataJson = await getAuthData();
		let api = `http://10.40.255.123:8000/user/recipes/`;
		
		await fetch(`http://127.0.0.1:8000/user/recipes/`, {
		//fetch(api, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Requested-With': 'XMLHttpRequest',
					'Authorization': 'Token ' + authDataJson.token
				}
		})
		.then((response) => response.json())//.then(data => console.log(data))
		.then(data => {
			setResults(data);
			})
			
    }
	
	useFocusEffect(
        React.useCallback(() => {
            onPressedFavBtn();
	}, []));
	
    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 35, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Favorite Recipes</Text>

            <ScrollView contentContainerStyle={{ justifyContent: 'space-between'}}>
                <View style={styles.itemsContainer}>
                    {results.map((value, index) => {
                        return <SearchItem itemID={value['recipe_id']} itemName={value['recipe_name']} itemThumb={value['image']} itemDescription={value['cooking_method']} navigation={navigation} />
                    })}
                </View>
            </ScrollView>
            <View style={{flex: 1 }}>
                <View style={styles.backBtnContainer}>
                    <Button buttonStyle={styles.backBtn}
                        onPress={onPressBackBtn}
                        title="Back"
                        titleStyle={{ fontFamily: "FiraSansCondensed_400Regular", paddingLeft: 10 }}
                        accessibilityLabel="Search more recipes button"
                        icon={
                            <Icon
                                name="arrow-left"
                                size={10}
                                color="white"
                            />
                        } />
                </View>
            </View>
        </View>
    )
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // maxHeight: windowHeight,
        padding: 25,
        paddingTop: 50,
    },
    itemsContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        //flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    icon: {

    },
    backBtnContainer: {
        //flex: 1,
        alignSelf: 'flex-end',
        position: 'absolute',
        left: 7,
        //top: 'auto',
        bottom: 50,
        borderRadius: 14,
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.4), 0px 30px 70px rgba(0,0,0,0.3)'

    },
    backBtn: {

        // width: 200,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#da4167',
    },
});

export default Favorites;