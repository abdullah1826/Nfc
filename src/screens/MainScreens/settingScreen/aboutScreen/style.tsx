import { StyleSheet } from "react-native";
import { HP, WP } from "../../../../shared/theme/PixelResponsive";
import { colors } from "../../../../shared/theme/colors";
import { appRadius, family, size } from "../../../../shared/theme/sizes";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,
        padding: HP(3)
    },
    iconBox: {
        width: WP(100),
        // backgroundColor: 'red',
        height: HP(20),
        marginTop: HP(5),
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF',
        alignItems: 'center'
    },
    aboutIcon: {
        height: WP(24),
        width: WP(24)
    },
    aboutTxt: {
        color: colors.b1,
        fontFamily: family.InterMedium,
        fontSize: size.h5,
        marginTop: HP(1)
    },
    reportBugBox: {
        flexDirection: 'row',
        height: HP(7),
        width: WP(90),
        backgroundColor: colors.bg1,
        shadowColor: colors.b1,
        elevation: 7,
        alignSelf: 'center',
        marginTop: HP(4),
        alignItems: 'center',
        borderRadius: appRadius.boxRadius,
        justifyContent: 'space-between',
        paddingHorizontal: WP(4)
    },
    bugIcon: {
        width: WP(10),
        height: WP(10),
        marginLeft: WP(2)
    },
    reportBugTxt: {
        color: colors.b1,
        marginLeft: WP(3),
        fontSize: size.normal,
        fontFamily: family.InterSemiBold
    },
    upAndDown: {
        height: HP(.8),
        width: WP(3.5),
        marginRight: WP(2)
    },
    nextIcon: {
        height: HP(1.5),
        width: WP(1.6),
        marginRight: WP(2)
    },
    logo: {
        height: WP(10),
        width: WP(15)
    },
    aboutNfcTitle: {
        fontSize: size.xxsmall,
        color: colors.b1,
        fontFamily: family.InterSemiBold,
        marginTop: HP(3)
    },
    aboutPrivacyBox: {
        padding: HP(3),
        width: WP(90),
        backgroundColor: colors.bg1,
        shadowColor: colors.b1,
        elevation: 5,
        borderRadius: appRadius.boxRadius + 5,
        alignSelf: 'center',
        marginTop: HP(3),
        justifyContent: 'center',
    },
    aboutPrivacyDesc: {
        color: colors.b1,
        width: WP(70),
        fontSize: size.xxtiny,
        marginTop: HP(.3),
        marginLeft: WP(1)
        // alignSelf: 'center'
        // backgroundColor: 'lightblue'
    },

});

export default style;