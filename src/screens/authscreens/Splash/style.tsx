import { StyleSheet } from "react-native";
import { HP, WP } from "../../../shared/theme/PixelResponsive";



const style = StyleSheet.create({
    rootConatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: WP(30),
        height: HP(10),
    }
});

export default style;