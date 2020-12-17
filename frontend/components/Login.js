import React, { useState } from 'react';

import { View, ScrollView, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import Constants from "expo-constants";
const { manifest } = Constants;

const Login = ({ navigation }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [stateMsg, setStateMsg] = useState("");

    const setAuthToken = async (data) => {
        try {
            await AsyncStorage.setItem('authentication_data', JSON.stringify({ token: data.token }));
        }
        catch (error) {
            console.log(error);
        }
    }

    function onPressLogin() {
        let status;
        let api = 'http://10.40.255.123:8000/login/'

        fetch(api, {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(data => {
            status = data.status;
            return data.json()
        }).then(data => {
            if (status == 400) {
                console.log(data.error)
                setStateMsg(data.error)
            } else {
                console.log("success")
                console.log(data);
                setAuthToken(data)
                navigation.navigate('Home')
            }
        }).catch(err => console.log(err))
    }

    function onPressRegister() {
        navigation.navigate('Register');
    }


    return (
        <ScrollView>
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.backgroundImage}>
                <View style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} ></View>
                <Image source={require('../assets/logo2.png')} style={styles.image} />
                <View style={styles.formContainer}>
                    <Text style={styles.errorMsg}>{stateMsg}</Text>
                    <Input
                        //inputContainerStyle={styles.searchInputContainer}
                        onChangeText={(val) => setUsername(val)}
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchContainer}
                        placeholder="Enter username"
                        label="Username"
                        //labelStyle={stateStyles.labelStyle}
                        accessibilityLabel="Username or email Input" />
                    <Text style={{ width: 260, height: 20 }}></Text>
                    <Input
                        //inputContainerStyle={styles.searchInputContainer}
                        onChangeText={(val) => setPassword(val)}
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchContainer}
                        placeholder="Enter your password"
                        label="Password"
                        secureTextEntry={true}
                        //labelStyle={stateStyles.labelStyle}
                        accessibilityLabel="Password Input" />
                    <Text style={{ width: 260, height: 20 }}></Text>

                    <Button buttonStyle={styles.enterBtn}
                        onPress={onPressLogin}
                        title="Login"
                        titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
                        accessibilityLabel="Login Button" />
                    <Text style={{ width: 260, height: 20 }}></Text>

                    <Button buttonStyle={styles.searchBtn}
                        //containerStyle={stateStyles.searchBtnContainer}
                        onPress={onPressRegister}
                        title="Don't have an account? Register"
                        titleStyle={{ color: '#6974e8', fontFamily: "FiraSansCondensed_400Regular", fontSize: 14 }}
                        accessibilityLabel="Register Button" />
                </View>
            </ImageBackground>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'none'
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 7,
        marginBottom: 25
    },
    image: {
        width: 170,
        height: 115,
        marginTop: 100,
        resizeMode: 'contain',
        marginBottom: 125

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center'
    },
    enterBtn: {
        color: '#fff',
        backgroundColor: "#da4167",
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        width: 260,

    },
    searchBtn: {
        backgroundColor: '#fff',
        // borderColor: 'rgba(232,240,255,0.4)',
        // borderWidth: 1,
        width: 260,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        alignSelf: 'center'
    },

    searchContainer: {
        //backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderColor: 'rgba(232,240,255,0.4)',
        //borderWidth: 1,
        width: 260,
        borderRadius: 15,
        padding: 0,
    },
    searchInput: {
        // backgroundColor: 'pink'
        color: '#000',
        fontSize: 20

    },
    searchBtnContainer: {
        display: 'none'
    },
    searchInputContainer: {
        borderWidth: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        // backgroundColor: 'green'
    },
    errorMsg: {
        color: 'red',
        maxWidth: 260,
        textAlign: 'center',
        marginBottom: 15
    }

})

export default Login;