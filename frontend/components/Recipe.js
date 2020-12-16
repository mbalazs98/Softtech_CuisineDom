import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


const Recipe = ({ route, navigation }) => {
    var x = 1
    const [image, setImage] = useState('../assets/food_placeholder.png');
    const [prepTime, setPrepTime] = useState("");

    function onPressBackToSearch() {
        navigation.navigate('Search')

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
        }));

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.backToSearch} onPress={onPressBackToSearch}>
                <Image source={require('../assets/arrow.png')} style={styles.icon} />
                <Text style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 26, fontFamily: 'FiraSansCondensed_400Regular' }}>Back to search results</Text>
            </TouchableOpacity>

            <ScrollView style={styles.recipeContainer}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={{ uri: image }} style={styles.image} />
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