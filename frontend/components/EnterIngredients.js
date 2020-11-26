import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Input } from 'react-native-elements';
// import SuggestedItem from './SuggestedItem';

const qu = fetch(`http://127.0.0.1:8000/recipes/get_ingredients`)
			.then((response) => response.json())
const _DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const DATA = []


let suggestedDATA = []
let selectedDATA = new Set();

const EnterIngredients = ({ route, navigation }) => {
    const [suggestedIngredients, setSuggestedIngredients] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState(null);
    const [searchInputValue, setSearchInputValue] = useState(null);


    function onSearchChange(e) {
        // TO BE IMPLEMENTED WITH CASE INSENSITIVE

        // console.log(e.target.value)
        setSearchInputValue(e.target.value)
        suggestedDATA = [];
        setSuggestedIngredients(suggestedDATA)
        if (e.target.value.length > 0) {

            for (let i = 0; i < DATA.length; i++) {
                // console.log(DATA[i].title)
                // if(DATA[i].title.match(`/[a-z, A-Z, 0-9]*/i${e.target.value}/[a-z, A-Z, 0-9]*/i`)) {
                if (DATA[i].title.match(`[a-z, A-Z, 0-9]*${e.target.value}[a-z, A-Z, 0-9]*`)) {
                    // console.log('suggested: ' + DATA[i].title)
                    suggestedDATA.push(DATA[i])
                    setSuggestedIngredients(suggestedDATA)
                }
            }
        }
    }

    function onFocusSearch() {

    }

    function onPressSuggestedItem(id, title) {
        //TODO get item using id only
        // console.log(id, title)
        selectedDATA.add(id)
        // console.log(Array.from(selectedDATA))
        // console.log(Array.from(selectedDATA).map(itemid => DATA.find(item => item.id == itemid)))
        setSelectedIngredients(Array.from(selectedDATA).map(itemid => DATA.find(item => item.id == itemid)))
        suggestedDATA = []
        setSuggestedIngredients(suggestedDATA)
        setSearchInputValue('')
    }


    const SelectedItem = ({ title }) => (
        <View style={styles.selectedItem}>
            <Text style={styles.selectedTitle}>{title}</Text>
        </View>
    );

    const SuggestedItem = ({ id, title }) => (
        <TouchableOpacity onPress={() => onPressSuggestedItem(id, title)}>
            <View style={styles.suggestedItem}>
                <Text style={styles.suggestedTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderSuggestedItem = ({ item }) => (<SuggestedItem id={item.id} title={item.title} />);
    const renderSelectedItem = ({ item }) => (<SelectedItem title={item.title} />);

    function onPressFindBtn() {
        navigation.navigate('Search', {
            searchQuery: 'your ingredients',
            results: [[1, 1, 'date', 'Calzone', 'calzonesq']]
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 35, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Enter your ingredients</Text>
            <Input
                onChange={onSearchChange}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
                containerStyle={styles.searchContainer}
                // placeholder="Search Recipes"
                onFocus={onFocusSearch}
                label="Type your ingredients"
                value={searchInputValue}
                labelStyle={styles.labelStyle}
                accessibilityLabel="Enter ingredients input" />
            <View>
                <FlatList
                    style={styles.suggestedList}
                    extraData={suggestedIngredients}
                    data={suggestedIngredients}
                    renderItem={renderSuggestedItem}
                    keyExtractor={item => item.id} />
            </View>
            <Text style={{marginTop: 75, fontSize: 16, color: 'rgba(0, 0, 0, .7)', marginBottom: 20}}>Selected Ingredients</Text>
            <FlatList
                style={styles.selectedList}
                extraData={selectedIngredients}
                data={selectedIngredients}
                renderItem={renderSelectedItem}
                keyExtractor={item => item.id} />
            <Button buttonStyle={styles.findBtn}
						containerStyle={styles.findBtnContainer}
						onPress={onPressFindBtn}
						title="Find Recipes"
						titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 24 }}
						accessibilityLabel="Find Recipes Button" />
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
    suggestedItem: {
        padding: 5
    },
    suggestedTitle: {
        backgroundColor: '#e8efff',
        fontSize: 16,
        padding: 18,
        // marginTop: 5,
        borderRadius: 7
    },
    suggestedList: {
        // backgroundColor: 'red',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 9999
    },
    selectedList: {
        zIndex: -1
    },
    selectedItem: {
        padding: 5
    },
    selectedTitle: {
        padding: 18,
        fontSize: 18,
        color: '#6974e8',
        fontWeight: 'bolder',
        boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderColor: '#6974e8',
        borderRadius: 7
    },
    findBtnContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20
    },
    findBtn: {
        backgroundColor: '#da4167',
        borderRadius: 15,
        height: 75,
        boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',

    }
})

export default EnterIngredients;