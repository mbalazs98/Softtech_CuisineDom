import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';


const SearchItem = ({itemID, itemName, itemThumb, itemDescription, navigation}) => {
    // console.log(`../assets/${itemThumb}.png`)
    
    function onPressSearchItem() {
        console.log(itemID)
        navigation.navigate('Recipe', {
            recipeID: itemID,
            recipeName: itemName,
            recipeThumb: itemThumb,
            recipeDescription: itemDescription
        })
    }
    return (
        <TouchableOpacity onPress={onPressSearchItem}>
        <View style={styles.card}>
            <Image source={require(`../assets/${itemThumb}.png`)} style={styles.image} />
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
        boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)'
    },
    card: {
        backgroundColor: '#e8efff',
        padding: 10,
        width: 140,
        borderRadius: 10,
        boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',
        marginLeft: 7.5,
        marginRight: 7.5,
        marginBottom: 30
    }
})

// main color: #da4167
// light blue: #e8efff
// dark blue: #6974e8
export default SearchItem;