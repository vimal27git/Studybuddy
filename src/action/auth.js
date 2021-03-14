import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'

//SIGNUP
export const signUp = (data) => async (dispatch) => {
    console.log(data)
    const {name, UserName, qualification, email, password, city, mobnumwithcode} = data
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
        console.log(data)
        console.log("User creation was succes")
        database()
        .ref('/users/' + data.user.uid)
        .set({
            name,
            UserName,
            mobnumwithcode,
            qualification, 
            city,
            email, 
            password,
            uid: data.user.uid
        })
        .then(() => console.log('Data set success'))
        Snackbar.show({
            text: 'account created',
            textColor: 'white',
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        console.error(error)
        Snackbar.show({
            text: "Signup failed",
            textColor: 'white',
            backgroundColor:'red'
        })
    })
}

export const reset = ( data ) => async( dispatch) => {
    console.log(data)
    const {email} = data
    
    auth()
    .sendPasswordResetEmail(email)
    .then(() => {
        console.log(`reset password link send back to at your this ${email} mail id `)
                Snackbar.show({
                    text: "check your mail-id",
                    textColor: "white",
                    backgroundColor: "#1b262c"
                })

    }).catch ((error) => {
        console.error(error)
        Snackbar.show({
            text: "password reset failed",
            textColor: 'white',
            backgroundColor:'red'
        })
    })
};


//SIGNIN

export const signIn = (data) => async (dispatch) => {
    console.log(data)
    const {email, password} = data

    auth()
        .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Sign in success")
                Snackbar.show({
                    text: "account signin",
                    textColor: "white",
                    backgroundColor: "#1b262c"
                })
            })
            .catch((error) => {
                console.error(error)
                Snackbar.show({
                    text: "Signin failed",
                    textColor: "white",
                    backgroundColor: "red"
                })
            })
}

//SIGNOUT

export const signOut = () => async (dispatch) => {
    auth()
    .signOut()
    .then(() => {
        Snackbar.show({
            text: "SignOut success",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        console.log(error)
        Snackbar.show({
            text: "Signout failed",
            textColor: "white",
            backgroundColor: "red"
        })
    })
}