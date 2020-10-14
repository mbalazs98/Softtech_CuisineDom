// import React from 'react';
// import { Button } from 'react-native-elements';
// import { useFonts, FiraSansCondensed_600SemiBold } from '@expo-google-fonts/fira-sans-condensed';
// import { AppLoading } from 'expo';


// const EnterIngredients = (props) => {
// 	let [fontsLoaded] = useFonts({
// 		FiraSansCondensed_600SemiBold,
// 	});
// 	if (!fontsLoaded) {
// 		return <AppLoading />;
// 	}
// 	return (
// 		<View style={styles.container}>
// 			<Button buttonStyle={styles.button}
// 				onPress={onPressEnterIngredients}
// 				title="Enter Ingredients"
// 				titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold" }}
// 				accessibilityLabel="Enter Ingredients Button" />
// 		</View>
// 	)
// }

// function onPressEnterIngredients() {
// 	console.log('enter ingredients button')
// }

// const styles = StyleSheet.create({
// 	container: {
// 		width: '100%',
// 		// backgroundColor: 'red',
// 		flex: 1,
// 		alignItems: 'center',
// 		paddingTop: 125
// 	},
// 	button: {
// 		color: '#fff',
// 		backgroundColor: "#da4167",
// 		// width: '50%',
// 		paddingLeft: 50,
// 		paddingRight: 50,
// 		paddingTop: 15,
// 		paddingBottom: 15,
// 		borderRadius: 15,
// 		// marginTop: 125
// 	}
// });

// export default EnterIngredients;

import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import SearchItem from './SearchItem';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({ route, navigation }) => {
    function onPressBackBtn() {
        console.log('back button')
        navigation.navigate('Home', {
            searchQuery: route.params.searchQuery
        })
    }
    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 35, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Search results for "{route.params.searchQuery}"</Text>
            
            <View style={styles.itemsContainer}>
                
                {route.params.results.map((value, index) => {
                    return <SearchItem itemName={value[3]} itemThumb="calzonesq" />
                })}
            </View>

            <Button buttonStyle={styles.backBtn}
                containerStyle={styles.backBtnContainer}
                onPress={onPressBackBtn}
                title="Search more recipes"
                titleStyle={{ fontFamily: "FiraSansCondensed_400Regular", paddingLeft: 10 }}
                accessibilityLabel="Search more recipes button"
                icon={
                    // <Image source={require('../assets/arrow.png')} style={styles.icon} />
                    <Icon
                        name="arrow-left"
                        size={10}
                        color="white"
                    />
                } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 25,
        paddingTop: 50
    },
    itemsContainer: {
        paddingLeft: 20,
        paddingRight: 20,

    },
    icon: {

    },
    backBtnContainer: {
        position: 'absolute',
        left: 30,
        top: 'auto',
        bottom: 50,
        borderRadius: 14,
        boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.4), 0px 30px 70px rgba(0,0,0,0.3)'

    },
    backBtn: {
        // width: 200,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#da4167',
        // boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)'
    },
});

export default Search;