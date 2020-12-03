import React, { useState, useContext } from 'react';

import { Form, View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import RecipeContext from './RecipeContext';
import FileBase64 from 'react-file-base64';

									   

const EditProfile = ({ navigation }) => {

    let {user, updateUser} = useContext(RecipeContext)

    const [newUsername, setNewUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newImage, setnewImage] = useState(null);

    function onUsernameChange(e) {
        // TO BE IMPLEMENTED WITH CASE INSENSITIVE

        // console.log(e.target.value)
        setNewUsername(e.target.value)
    }

    function onOldPasswordChange(e) {
        // TO BE IMPLEMENTED WITH CASE INSENSITIVE

        // console.log(e.target.value)
        setOldPassword(e.target.value)
    }

    function onNewPasswordChange(e) {
        // TO BE IMPLEMENTED WITH CASE INSENSITIVE

        // console.log(e.target.value)
        setNewPassword(e.target.value)
    }

    function onPressCancel() {
        navigation.navigate('Profile')
    }


    function onPressSave() {
        if (newUsername.length > 0 && newPassword.length > 0 && oldPassword == user.password) {
            updateUser({
                'name': newUsername,
                'image': newImage,
                'password': newPassword
            })
            // TODO when the api endpoint is implemented
            // fetch(`http://127.0.0.1:8000/user/edit/`, {
            //     method: 'POST',
            //     body: JSON.stringify({
                    //     'username': user.name,
                    //     'password': user.password,
                    //     'image': user.image
                    // }),
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //         'X-Requested-With': 'XMLHttpRequest'
            //     }
            // })
            //     .then((response) => response.json())
            //     .then(data => {
            //         console.log(data)
            //         navigation.navigate('Profile')
            //     })

            navigation.goBack();
        }
    }

    function doneImage(file) {
        setnewImage(file['base64'])
    }

    return (
        <View style={styles.backgroundImage}>
            <Text style={{ marginTop: 25, color: 'black', fontSize: 26, fontFamily: 'FiraSansCondensed_600SemiBold' }}>Edit Profile</Text>
            <View style={styles.formContainer}>
                <Input
                    onChange={onUsernameChange}
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchContainer}
                    //placeholder="Enter your new username"
                    label="Username"
                    accessibilityLabel="Username Input" />
                <Text style={{ width: 260, height: 20 }}></Text>
                <Input
                    onChange={onOldPasswordChange}
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
                    onChange={onNewPasswordChange}
                    //inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchContainer}
                    //placeholder="Enter your new password"
                    label="New Password"
                    secureTextEntry={true}
                    //labelStyle={stateStyles.labelStyle}
                    accessibilityLabel="New Password Input" />
                <Input
                    //inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchContainer}
                    //placeholder="Enter your new password"
                    label="Confirm Password"
                    secureTextEntry={true}
                    //labelStyle={stateStyles.labelStyle}
                    accessibilityLabel="Confirm Password Input" />
                <FileBase64
                    multiple={false}
                    onDone={doneImage} />
                <Text style={{ width: 260, height: 20 }}></Text>

                <View style={{ position: 'absolute', bottom: 20 }}>
                    <Button buttonStyle={styles.saveBtn}
                        onPress={onPressSave}
                        title="Save"
                        titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
                        accessibilityLabel="Save Button" />
                    <Button buttonStyle={styles.cancelBtn}
                        onPress={onPressCancel}
                        title="Cancel"
                        titleStyle={{ fontFamily: "FiraSansCondensed_600SemiBold", fontSize: 20 }}
                        accessibilityLabel="Cancel Button" />
                </View>

            </View>
        </View>
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

})

export default EditProfile;