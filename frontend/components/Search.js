import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import SearchItem from './SearchItem';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({ route, navigation }) => {

    function onPressBackBtn() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 35, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Search results for "{route.params.searchQuery}"</Text>

            <ScrollView contentContainerStyle={{ justifyContent: 'space-between'}}>
                <View style={styles.itemsContainer}>
                    {route.params.results.map((value, index) => {
                        return <SearchItem itemID={value['recipe_id']} itemName={value['recipe_name']} itemThumb={value['image']} itemDescription={value['cooking_method']} navigation={navigation} />
                    })}
                </View>
            </ScrollView>
            <View style={{flex: 1 }}>
                <View style={styles.backBtnContainer}>
                    <Button buttonStyle={styles.backBtn}
                        onPress={onPressBackBtn}
                        title="Search more recipes"
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

export default Search;