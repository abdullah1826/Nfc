import {Alert, Platform} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {getPlatform, showErrorToast, showSuccessToast, useNetworkStatus } from './Helper';
import auth from '@react-native-firebase/auth';
import { SOCIAL_TYPE } from './constants';
import { loginUser } from './services/authServices';
import { setAuthenticated, setUserData } from '../../redux/Slices/UserSlice';
import { LoginManager, LoginBehavior, AccessToken } from 'react-native-fbsdk-next';


const isuserPlatform = getPlatform()


//Google Login
export const onGoogleLogin = async ( dispatch:any, navigation:any, setIsLoading:any) => {
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const  userInfo  = await GoogleSignin.signIn();
        const {email} =userInfo?.user
        const {name}  =userInfo?.user
        const {id} =userInfo?.user
        const issocialtype = "google"
        handleSubmit(id, setIsLoading,dispatch,navigation,email,name,issocialtype)
      } catch (error:any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert('Error', 'Operation canceled by user');
          setIsLoading(false);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Error', 'No User Available');
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    } 
  
//On Apple SignIn
// export const onAppleLogin = async (
//   navigation: any,
//   dispatch: any,
//   setLoading: any,
// ) => {
//   try {
//     // setLoading(true);
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });
//     const {identityToken, nonce} = appleAuthRequestResponse;
//     if (identityToken) {
//       const {identityToken, nonce} = appleAuthRequestResponse;
//       const appleCredential = auth.AppleAuthProvider.credential(
//         identityToken,
//         nonce,
//       );
//       // let currentUser = await getUserFromDatabase(res?.uid);
//       // console.log('[currentUser]', currentUser);

//       auth()
//         .signInWithCredential(appleCredential)
//         .then(async user => {
//           let currentUser = await getUserFromDatabase(user?.user?.uid);
//           console.log('[currentUser]', currentUser);
//           //CHECK HERE IF USER WITH THIS UID IS ALREADY PRESENT IN DATABASE OR NOT  (METHOD WILL BE THERE CHECKING THIS UID IS PRESENT OR NOT)
//           //IF PRESENT, DIRECT NAVIGATION TO HOME
//           //IF NOT, SAVE USER TO DATABASE
//           if (currentUser === undefined || currentUser === null) {
//             let ref = database().ref('/Users').push();
//             let userData = {
//               email: user?.user?.email,
//               name: user?.user?.displayName || '',
//               phoneNumber: user?.user?.displayName || '',
//               password: '',
//               uid: user?.user?.uid,
//               key: ref.key,
//               image: user?.user?.photoURL || '',
//               userType: SOCIAL_TYPE,
//             };
//             ref.set(userData);
//             dispatch(setUser(userData));
//             setLoading(false);
//             dispatch(setAuthenticated(true));
//             navigation.replace('Loading');
//           } else {
//             setLoading(false);
//             dispatch(setUser(currentUser));
//             dispatch(setAuthenticated(true));
//             navigation.replace('Loading');
//           }
//           // Succeed fully user logs in
//         })
//         .catch(error => {
//           Alert.alert('Sorry', error);
//           // Something goes wrong
//         });
//     } else {
//       // handle this - retry?
//       Alert.alert('Error', 'Try Again few seconds later.');
//       setLoading(false);
//     }
//   } catch (error) {
//     setLoading(false);
//     Alert.alert('Error', error?.message);
//   }
// };

// facebook sign in
export const onFacebookLogin = async (
  navigation: any,
  dispatch: any,
  setLoading: any,
) => {
  try {
    setLoading(true);
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.grantedPermissions) {
      const token = await AccessToken.getCurrentAccessToken();
      console.log("token",token)
      // if (token) {
      //   const facebookCredential = auth.FacebookAuthProvider.credential(
      //     token?.accessToken);
      //   const response = await auth().signInWithCredential(facebookCredential);
      //   const issocialtype = "facebook"
      //   //  handleSubmit(id, setIsLoading,dispatch,navigation,email,name,issocialtype
      //   console.log("response++++",response)
      //   setLoading(false);
      // }
    } else {
      Alert.alert('Error', 'Facebook login failed');
      setLoading(false);
    }
  } catch (error: any) {
    setLoading(false);
    Alert.alert('Error', error?.message);
  }
};



const handleSubmit = async (values: any,setIsLoading:any,dispatch:any, navigation:any,email:any,name:any,issocialtype) => {
    try {
        setIsLoading(true)
        const params = {
         email:email||"",
         social_id:values,
         platform:isuserPlatform,
         fcm_token:"",
         login_with:issocialtype,
         name:name || ""
     }
    loginUser(params).then((res:any)=>{
      if(res && res?.data && res?.data?.data){
dispatch(setUserData(res?.data?.data))
dispatch(setAuthenticated(true))
showSuccessToast('Login Success', 'User Login successfully');
setIsLoading(false)
navigation.replace('HomeStack', { Screen: 'Home' });
      }
      
    }).catch((error)=>{
      // console.log("errrorrrr", error.response.data.message)
        showErrorToast('Registration Failed', error?.response?.data?.message || 'An error occurred');
        setIsLoading(false)
    }).finally(()=>{
      setIsLoading(false)
    })

    } catch (error: any) {
        console.log("error",error)
        setIsLoading(false)
    }
};