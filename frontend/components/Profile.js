import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RecipeContext from './RecipeContext';
import AsyncStorage from '@react-native-community/async-storage';



const Profile = ({ route, navigation }) => {
											
    let {user, updateUser} = useContext(RecipeContext);

    function onPressAddBtn() {

    }

    function onPressEditBtn() {
        navigation.navigate('EditProfile')
    }

    function onPressBackToHome() {
        navigation.navigate('Home')
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
	
	const removeAuthToken = async () => {
		try {
			await AsyncStorage.removeItem('authentication_data');
		}
		catch (error) {
			console.log(error);
		  }
	}
	
	const onPressLogout = async () => {
        route.params.resetQuery()
		console.log("OnLogout")
		const authDataJson = await getAuthData();
		console.log(authDataJson)
		fetch(`http://127.0.0.1:8000/logout/`, {
			method: 'POST',
			//credentials: 'same-origin',
			headers: {
			//"X-CSRFToken": Cookies.get("csrftoken"),
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Token '+authDataJson.token 
			}
		}).then(data => {
            status = data.status;
            return data.json()
        }).then(data=> {
            if(status == 200) {
				console.log("success")
                console.log(data);
				removeAuthToken();
                navigation.navigate('Login')
                
            } else {
                console.log("ERR")
            }
        })
	}

    return (
        <View style={styles.container}>
			<View>
				<TouchableOpacity style={styles.backToHome} onPress={onPressBackToHome}>
					<Image source={require('../assets/arrow.svg')} style={styles.icon} />
					<Text style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 26, fontFamily: 'FiraSansCondensed_400Regular' }}>Back</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressLogout} style={{position: 'absolute', right: 10, top: 5, flexDirection: 'row-reverse', alignItems: 'right'}}>
					<Image source={require('../assets/logout_btn.png')} style={styles.icon} />
				</TouchableOpacity>
            </View>
			{/* <Image source={require(`../assets/${itemThumb}.png`)} style={styles.image} /> */}
            <View style={styles.userContainer}>
            <Image source={user.image && user.image.length ? {uri: user.image} : require('../assets/profile_placeholder.png')} style={styles.image} />
                <View style={styles.recipeMainInfo}>
                    <Text style={styles.recipeTitle}>{user.name}</Text>
                    <Text style={styles.recipeTime}><b>{user.email}</b></Text>
                </View>
            </View>
            <Button buttonStyle={styles.addBtn}
                containerStyle={styles.addBtnContainer}
                onPress={onPressAddBtn}
                title="Add recipe"
                titleStyle={{ fontFamily: "FiraSansCondensed_400Regular" }}
                accessibilityLabel="Add recipe button" />
            <Button buttonStyle={styles.editBtn}
                containerStyle={styles.editBtnContainer}
                onPress={onPressEditBtn}
                title="Edit profile"
                titleStyle={{ fontFamily: "FiraSansCondensed_400Regular" }}
                accessibilityLabel="Edit profile button" />
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
    addBtnContainer: {
        position: 'absolute',
        left: 30,
        top: 'auto',
        bottom: 50,
        borderRadius: 14,
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.4), 0px 30px 70px rgba(0,0,0,0.3)'

    },
    editBtnContainer: {
        position: 'absolute',
        left: 150,
        top: 'auto',
        bottom: 50,
        borderRadius: 14,
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.4), 0px 30px 70px rgba(0,0,0,0.3)'

    },
    addBtn: {
        // width: 200,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#da4167',

    },
    editBtn: {
        // width: 200,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#b8cdfc',

    },
    backToHome: {
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
    userContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'green'
    },
    image: {
        backgroundColor: '#e8efff',
        padding: 10,
        width: 150,
        height: 150,
        borderRadius: 10,
        //boxShadow: '0px 40px 52px -40px rgba(0,0,0,0.15), 0px 30px 70px rgba(0,0,0,0.2)'
    },
    recipeMainInfo: {
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
export default Profile;