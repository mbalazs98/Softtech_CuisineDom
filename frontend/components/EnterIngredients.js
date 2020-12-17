import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Button, Input } from 'react-native-elements';
// import SuggestedItem from './SuggestedItem';

let qu;
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

let DATA = [];

let suggestedDATA = []
let selectedDATA = new Set();

const EnterIngredients = ({ route, navigation }) => {
    const [suggestedIngredients, setSuggestedIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');

    //qu = fetch(`http://127.0.0.1:8000/recipes/get_ingredients`)
    //		.then((response) => response.json())
    //DATA = JSON.parse(qu)
    useEffect(() => {
        if (DATA.length == 0) {

            let api = 'http://10.40.255.123:8000/recipes/get_ingredients';
            fetch(`http://127.0.0.1:8000/recipes/get_ingredients`)
            //fetch(api)
                .then((response) => response.json())
                .then(data => { DATA = data; console.log('data loaded!'); })
        }

    });

    function onSearchChange(e) {
        // TO BE IMPLEMENTED WITH CASE INSENSITIVE

        // console.log(e.target.value)
        // setSearchInputValue(e.target.value)
        suggestedDATA = [];
        setSuggestedIngredients(suggestedDATA)
        if (searchInputValue.length > 0) {

            for (let i = 0; i < DATA.length && suggestedDATA.length < 5; i++) {
                // if(DATA[i].title.match(`/[a-z, A-Z, 0-9]*/i${e.target.value}/[a-z, A-Z, 0-9]*/i`)) {
                if (DATA[i] && DATA[i]['ingredient_name'].match(`[a-z, A-Z, 0-9]*${searchInputValue.toLocaleLowerCase()}[a-z, A-Z, 0-9]*`)) {
                    suggestedDATA.push(DATA[i])
                    setSuggestedIngredients(suggestedDATA)
                }
            }
        }
    }

    function onFocusSearch() {
        console.log(DATA.length)
    }

    function onPressSuggestedItem(id, title) {
        //TODO get item using id only
        // console.log(id, title)
        selectedDATA.add(id)
        console.log('sdsd ', selectedDATA);
        // console.log(Array.from(selectedDATA))
        // console.log(Array.from(selectedDATA).map(itemid => DATA.find(item => item.id == itemid)))
        console.log('1 addition')
        setSelectedIngredients(Array.from(selectedDATA).map(itemid => DATA.find(item => item['ingredient_id'] == itemid)))
        suggestedDATA = [];
        setSuggestedIngredients(suggestedDATA)
        setSearchInputValue('')
    }

    function onPressDeleteSelectedItem(id, updateMethod) {
        let selectedTmp = [];
        selectedTmp = selectedTmp.concat(selectedIngredients);
        selectedTmp = selectedTmp.filter(item => item.ingredient_id != id)
        console.log('2 addition')
        setSelectedIngredients(selectedTmp);


        selectedDATA = new Set();
        selectedTmp.forEach(item => {
            selectedDATA.add(item['ingredient_id'])
        })
        console.log(selectedDATA)
    }

    // const SelectedItem = ({ title, id }) => (

    // );

    const SuggestedItem = ({ id, title }) => (
        <TouchableOpacity onPress={() => onPressSuggestedItem(id, title)}>
            <View style={styles.suggestedItem}>
                <Text style={styles.suggestedTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderSuggestedItem = ({ item }) => (<SuggestedItem id={item['ingredient_id']} title={item['ingredient_name']} />);
    //const renderSelectedItem = ({ item }) => (<SelectedItem title={item['ingredient_name']} id={item['ingredient_id']} />);
    const renderSelectedItem = ({ item }) => (
        <View style={styles.selectedItem}>
            <Text style={styles.selectedTitle}>{item['ingredient_name']}</Text>
            <TouchableOpacity style={styles.deleteSelectedItem} onPress={() => { onPressDeleteSelectedItem(item['ingredient_id'], setSelectedIngredients); }}></TouchableOpacity>
        </View>
    );

    function onPressFindBtn() {
        console.log(selectedIngredients.length)
        if (selectedIngredients.length > 0) {
            let api = 'http://10.40.255.123:8000/recipes/ingredients';
            fetch(`http://127.0.0.1:8000/recipes/ingredients`, {
            //fetch(api, {
                method: 'POST',
                body: JSON.stringify({
                    'ingredient': selectedIngredients
                }),
                //credentials: 'same-origin',
                headers: {
                    //"X-CSRFToken": Cookies.get("csrftoken"),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
                .then((response) => response.json())
                .then(data => {
                    console.log(data)
                    navigation.navigate('Search', {
                        searchQuery: 'your ingredients',
                        results: data
                    })
                })
        }


    }

    function onPressBackToHome() {
        selectedDATA = new Set();
        setSelectedIngredients([]);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backToSearch} onPress={onPressBackToHome}>
                <Image source={require('../assets/arrow.png')} style={styles.icon} />
                <Text style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 26, fontFamily: 'FiraSansCondensed_400Regular' }}>Back to Home</Text>
            </TouchableOpacity>
            <Text style={{ marginBottom: 35, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Enter your ingredients</Text>
            <Input
                onChangeText={(val) => setSearchInputValue(val)}
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
                    keyExtractor={item => item['ingredient_id']} />
            </View>
            <Text style={{ marginTop: 75, fontSize: 16, color: 'rgba(0, 0, 0, .7)', marginBottom: 20 }}>Selected Ingredients</Text>
            <FlatList
                style={styles.selectedList}
                extraData={selectedIngredients}
                data={selectedIngredients}
                renderItem={renderSelectedItem}
                keyExtractor={item => item['ingredient_id']} />
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
        zIndex: -1,
        maxHeight: 300
    },
    selectedItem: {
        padding: 5
    },
    selectedTitle: {
        padding: 18,
        fontSize: 18,
        color: '#6974e8',
        fontWeight: 'bold',
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',
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
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.1)',

    },
    deleteSelectedItem: {
        width: 20,
        height: 5,
        backgroundColor: 'red',
        position: 'absolute',
        right: 30,
        top: 35,
        borderRadius: 3
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
})

export default EnterIngredients;