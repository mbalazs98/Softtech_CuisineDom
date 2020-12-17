import React, { useState, useContext } from 'react';

import { Form, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import RecipeContext from './RecipeContext';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';



const EditProfile = ({ navigation }) => {

    let { user, updateUser } = useContext(RecipeContext)

    const [newUsername, setNewUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [stateMsg, setStateMsg] = useState("");
    const [newImage, setnewImage] = useState(null);

    function onPressCancel() {
        navigation.navigate('Profile')
    }

    const initAuthToken = async () => {
        console.log('user ', user)
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



    const onPressSave = async () => {
        let tmp_user = {
            username: '',
            password: '',
            image: ''
        };
        let tmp_user2 = user;
        if (newUsername.length > 0) {
            tmp_user.username = newUsername;
            tmp_user2.name = newUsername;
        }
        if (newPassword.length > 0 && oldPassword.length > 0) {
            if (newPasswordConfirm === newPassword) {
                tmp_user.password = newPassword;
                tmp_user.old_password = oldPassword;
            } else {
                setStateMsg('Passwords don\'t match!')
                return;
            }
        }
        if (newImage) {
            tmp_user.image = newImage;
            tmp_user2.image = newImage;
        }

        const authDataJson = await initAuthToken();
        let status = 200;
        let api = 'http://10.40.255.123:8000/user/change_settings/'
        // fetch(`http://127.0.0.1:8000/user/change_settings/`, {
        fetch(api, {
            method: 'POST',
            body: JSON.stringify({
                'username': tmp_user.username,
                'password': tmp_user.password,
                'old_password': tmp_user.old_password,
                'profile_picture': tmp_user.image
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Token ' + authDataJson.token
            }
        })
            .then((response) => { status = response.status; return response.json() })
            .then(data => {
                console.log(status)
                if (status == 200) {
                    updateUser({
                        'name': tmp_user2.name,
                        'image': tmp_user2.image,
                        'email': user.email
                    })
                    navigation.navigate('Profile')
                }
                else {
                    setStateMsg(data.message)
                }
            })
    }

    const onPressUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            setnewImage('data:image/jpeg;base64,' + result.base64);
        }
    };

    return (
        <ScrollView>
            <View style={styles.backgroundImage}>
                <Text style={{ marginTop: 75, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Edit Profile</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.errorMsg}>{stateMsg}</Text>
                    <Input
                        onChangeText={(val) => setNewUsername(val)}
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchContainer}
                        //placeholder="Enter your new username"
                        label="Username"
                        accessibilityLabel="Username Input" />
                    <Text style={{ width: 260, height: 20 }}></Text>
                    <Input
                        onChangeText={(val) => setOldPassword(val)}
                        //inputContainerStyle={styles.searchInputContainer}
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchContainer}
                        secureTextEntry={true}
                        //placeholder="Enter your old password"
                        label="Old Password"
                        //labelStyle={stateStyles.labelStyle}
                        accessibilityLabel="Old Password Input" />
                    <Text style={{ width: 260, height: 20 }}></Text>
                    <Input
                        onChangeText={(val) => setNewPassword(val)}
                        //inputContainerStyle={styles.searchInputContainer}
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchContainer}
                        //placeholder="Enter your new password"
                        label="New Password"
                        secureTextEntry={true}
                        //labelStyle={stateStyles.labelStyle}
                        accessibilityLabel="New Password Input" />
                    <Input
                        onChangeText={(val) => setNewPasswordConfirm(val)}
                        //inputContainerStyle={styles.searchInputContainer}
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchContainer}
                        //placeholder="Enter your new password"
                        label="Confirm Password"
                        secureTextEntry={true}
                        //labelStyle={stateStyles.labelStyle}
                        accessibilityLabel="Confirm Password Input" />
                    <Button
                        buttonStyle={styles.saveBtn}
                        onPress={onPressUploadImage}
                        title="Choose Image"
                        accessibilityLabel="Choose Image" />
                    <Text style={{ width: 260, height: 20 }}></Text>

                    <View>
                        <Button buttonStyle={styles.saveBtn}
                            onPress={onPressSave}
                            title="Save"
                            titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
                            accessibilityLabel="Save Button" />
                        <Button buttonStyle={styles.cancelBtn}
                            onPress={onPressCancel}
                            title="Cancel"
                            titleStyle={{ color: 'darkblue', fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
                            accessibilityLabel="Cancel Button" />
                    </View>

                </View>
            </View>
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
        flex: 1,
        backgroundColor: "#fff",
        padding: 25,
        paddingBottom: 50,
        borderRadius: 7,
        marginBottom: 25,
        marginTop: 35
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
    cancelBtn: {
        color: '#fff',
        backgroundColor: "#b8cdfc",
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        width: 260,


    },
    saveBtn: {
        backgroundColor: '#da4167',
        // borderColor: 'rgba(232,240,255,0.4)',
        // borderWidth: 1,
        width: 260,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 5
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
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    errorMsg: {
        color: 'red',
        maxWidth: 260,
        textAlign: 'center',
        marginBottom: 15
    }

})

export default EditProfile;