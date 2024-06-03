import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP } from "../../../shared/theme/PixelResponsive";
import { family, size } from "../../../shared/theme/sizes";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,
        padding: HP(3)
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