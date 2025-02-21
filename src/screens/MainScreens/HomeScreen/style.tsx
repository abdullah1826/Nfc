import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP, WP } from "../../../shared/theme/PixelResponsive";
import { family, size } from "../../../shared/theme/sizes";


const style = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.bg1,
        padding: HP(3)
    },
    actionCardBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    RecordsHeadingBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: HP(5),
        alignItems: 'center'
    },
    RecordsHeading: {
        fontSize: size.xlarge,
        color: colors.b1,
        fontFamily: family.InterBold

    },
    seeAllTxt: {
        color: colors.green,
        fontFamily: family.InterSemiBold,
        fontSize: size.xsmall
    },
    headingTxt: {
        color: colors.b1,
        textAlign: 'center',
        fontFamily: family.InterBold,
        fontSize: size.large,
        marginTop: HP(5)
    },
    nfcImg: {
        height: HP(20),
        width: WP(31),
        marginTop: HP(5)
    },
    lastTxt: {
        color: colors.g1,
        fontSize: size.xsmall,
        marginTop: HP(6)
    }

});

export default style