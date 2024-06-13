import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP, WP } from "../../../shared/theme/PixelResponsive";
import { appRadius, family, size } from "../../../shared/theme/sizes";

// Social Links

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,
        padding: HP(2.5),
    },
    socialLinksBox: {
        // backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    // iconBox: {
    //     width: WP(22),
    //     height: HP(8),
    //     // backgroundColor: 'red',
    //     alignItems: 'center',
    //     marginTop: HP(2)
    // },
    icon: {
        width: WP(16),
        height: HP(7.5),
        resizeMode:"contain"
    },
    iconName: {
        color: colors.g21,
        fontSize: size.xsmall,
        fontFamily: family.InterMedium,
        marginTop: HP(1)
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: colors.bg1,
        width: WP(80),
        height: HP(6),
        shadowColor: colors.b1,
        elevation: 10,
        borderRadius: appRadius.boxRadius - 5,
        marginTop: HP(4),
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