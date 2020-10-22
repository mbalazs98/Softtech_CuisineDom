import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';



const Recipe = ({ route, navigation }) => {

    function onPressBackToSearch() {
        navigation.navigate('Search')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backToSearch} onPress={onPressBackToSearch}>
                    <Image source={require('../assets/arrow.svg')} style={styles.icon} />
                    <Text style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 26, fontFamily: 'FiraSansCondensed_400Regular' }}>Back to search results</Text>
            </TouchableOpacity>
            {/* <Image source={require(`../assets/${itemThumb}.png`)} style={styles.image} /> */}
            <View style={styles.recipeContainer}>
                <Image source={require(`../assets/${route.params.recipeThumb}.png`)} style={styles.image} />
                <View style={styles.recipeMainInfo}>
                    <Text style={styles.recipeTitle}>{route.params.recipeName}</Text>
                    <Text style={styles.recipeTime}>Time to make: <b>{route.params.recipeTime}</b></Text>
                </View>
                <View style={styles.recipeDescriptionContainer}>
                    <Text style={styles.recipeDescriptionTitle}>Description</Text>
                    <Text style={styles.recipeDescriptionText}>{route.params.recipeDescription}</Text>
                </View>
            </View>
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
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'green'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 7,
        // backgroundColor: 'red'
        boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)'
    },
    recipeMainInfo: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'center',
        // backgroundColor: 'pink',
        height: 150
    },
    recipeTitle: {
        fontFamily: 'FiraSansCondensed_600SemiBold',
        fontSize: 32
        // backgroundColor: 'red'
    },
    recipeTime: {
        fontFamily: 'FiraSansCondensed_400Regular',
        fontSize: 14,
        marginTop: 10
    },
    recipeDescriptionContainer: {
        marginTop: 35,
        width: '100%'
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