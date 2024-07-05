import { StyleSheet } from "react-native";
import { colors } from "../../../../shared/theme/colors";
import { HP, WP } from "../../../../shared/theme/PixelResponsive";
import { appRadius, family, size } from "../../../../shared/theme/sizes";

export const style = StyleSheet.create({
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
    privacyIcon: {
        height: HP(11),
        width: WP(22)
    },
    privacyPolicyTxt: {
        color: colors.b1,
        fontFamily: family.InterMedium,
        fontSize: size.h5,
        marginTop: HP(1)
    },
    cardsBox: {
        marginTop: HP(4)
    },
    aboutPrivacy: {
        flexDirection: 'row',
        height: HP(7),
        width: WP(90),
        backgroundColor: colors.bg1,
        shadowColor: colors.b1,
        elevation: 7,
        alignSelf: 'center',
        marginTop: HP(2),
        borderRadius: appRadius.boxRadius,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    aboutTxt: {
        color: colors.b1,
        marginLeft: WP(5),
        fontSize: size.normal,
        fontFamily: family.InterSemiBold
    },
    aboutIcon: {
        height: HP(1),
        width: WP(4),
        marginRight: WP(5)
    },
    aboutPrivacyBox: {
        height: HP(21),
        width: WP(90),
        backgroundColor: colors.bg1,
        shadowColor: colors.b1,
        elevation: 5,
        borderRadius: appRadius.boxRadius,
        alignSelf: 'center',
        marginTop: HP(3),
        alignItems: 'center',
        // justifyContent: 'center'
    },
    aboutPrivacyDesc: {
        color: colors.b1,
        width: WP(84),
        fontSize: size.xxsmall
        // backgroundColor: 'lightblue'
    }
});