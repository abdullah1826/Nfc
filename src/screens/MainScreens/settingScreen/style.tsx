import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP, WP } from "../../../shared/theme/PixelResponsive";
import { family, size } from "../../../shared/theme/sizes";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,

    },
    secondcontainer:{
        flex: 1,
        backgroundColor: colors.bg1,
        marginHorizontal:WP("4"),
marginTop:Platform.OS==="android"?WP("5"):null
    },
    versionTxt: {
        color: colors.b1,
        fontSize: size.xxtiny,
        fontFamily: family.InterSemiBold,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 15
    }
});

export default style;