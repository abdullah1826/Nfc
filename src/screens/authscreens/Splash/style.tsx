import { StyleSheet } from "react-native";
import { WP, HP } from "../../../exporter";



const style = StyleSheet.create({
    rootConatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#FFFFFF"
    },
    logo: {
        width:WP(70),
        height: HP(12),
        resizeMode:"contain"
    },
   
});

export default style;