import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';

const Register = ({navigation}) => {

    function onPressRegister() {
        navigation.navigate('Home')
    }

    
    function onPressLogin() {
        navigation.navigate('Login');
    }


    return (
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.backgroundImage}>
            <div style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
            <Image source={require('../assets/logo2.png')} style={styles.image} />
            <View style={styles.formContainer}>
                <Input
                    //inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchContainer}
                    placeholder="Enter your username"
                    label="Username"
                    //labelStyle={stateStyles.labelStyle}
                    accessibilityLabel="Username Input" />
                <Text style={{ width: 260, height: 20 }}></Text>
                <Input
                    //inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchContainer}
                    placeholder="Enter your email"
                    label="Email"
                    //labelStyle={stateStyles.labelStyle}
                    accessibilityLabel="Email Input" />
                <Text style={{ width: 260, height: 20 }}></Text>
                <Input
                    //inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchContainer}
                    placeholder="Enter your password"
                    label="Password"
                    secureTextEntry={true}
                    //labelStyle={stateStyles.labelStyle}
                    accessibilityLabel="Password Input" />
                <Text style={{ width: 260, height: 20 }}></Text>

                <Button buttonStyle={styles.enterBtn}
                    onPress={onPressRegister}
                    title="Register"
                    titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
                    accessibilityLabel="Register Button" />
                <Text style={{ width: 260, height: 20 }}></Text>

                <Button buttonStyle={styles.searchBtn}
                    //containerStyle={stateStyles.searchBtnContainer}
                    onPress={onPressLogin}
                    title="Already have an account? Login"
                    titleStyle={{ color: '#6974e8', fontFamily: "FiraSansCondensed_400Regular", fontSize: 14 }}
                    accessibilityLabel="Login Button" />
            </View>
        </ImageBackground>
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
        //    outlineWidth: 0,
        fontSize: 20

    },
    searchBtnContainer: {
        display: 'none'
    },
    searchInputContainer: {
        border: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        // backgroundColor: 'green'
    }

})

export default Register;