import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP, WP } from "../../../shared/theme/PixelResponsive";
import { appRadius, size } from "../../../shared/theme/sizes";


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,
        padding: HP(3)
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: colors.bg1,
        width: WP(85),
        height: HP(6),
        shadowColor: colors.b1,
        elevation: 10,
        borderRadius: appRadius.boxRadius - 5,
        marginTop: HP(6),
        alignSelf: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        width: WP(5),
        height: HP(2.5),
        marginLeft: WP(6)
    },
    input: {
        color: colors.b1,
        marginLeft: WP(1),
        fontSize: size.xsmall,
        flex: 1
    },
});

export default style;