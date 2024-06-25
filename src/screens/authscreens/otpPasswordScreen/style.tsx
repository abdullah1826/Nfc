import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP, WP } from "../../../shared/theme/PixelResponsive";
import { family, size } from "../../../shared/theme/sizes";


//Login

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,
        marginHorizontal:WP("5"),
        justifyContent:"center",
        alignItems:"center"
    },
    logo: {
        width: WP(45),
        height: HP(7),
        alignSelf: 'center',
        marginTop: HP(25),
        resizeMode:"contain"
    },
    headingTxt: {
        color: colors.green,
        fontSize: size.xxlarge,
        fontFamily: family.InterRegular,
        marginTop: HP(3),
        alignSelf: 'center',
        textAlign:"center"
    },
    descTxt: {
        fontSize: size.xxtiny,
        color: colors.b1,
        textAlign: 'center',
        width: '86%',
        alignSelf: 'center'
    },
    inputsBox: {
        marginTop: HP(2)
    },
    alredyAccountTxt: {
        color: colors.g21,
        alignSelf: 'center',
        marginTop: HP(4),
        fontSize: size.xsmall
    },
    signInTxt: {
        color: colors.green1,
        fontFamily: family.InterBold,
        fontSize: size.xsmall,
        textDecorationLine: 'underline',
    },
    errorMsg: {
        color: 'red',
        fontSize: size.tiny,
        fontWeight: '400',
        marginTop: HP(1)
    },
    codeFieldRoot: {
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
      },
      cell: {
        width:50,
        height:50,
        borderRadius:12,
        color: colors.green1,
        fontSize:size.xlarge,
        backgroundColor: colors.White,
        textAlign: 'center',
        fontFamily: family.InterMedium,
        fontWeight: "bold",
        alignItems: 'center',
        justifyContent: 'center',
        padding: WP(3),
        borderWidth: 1,
        borderColor: colors.white,
        alignSelf:"center",
        marginRight:WP("4")
      },
      focusCell: {
        justifyContent: 'center',
        alignItems:"center",
        alignSelf:"center"
      },
      resendview: {
        marginVertical:WP("5"),
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
      },
      restxt: {
        color: colors.dullgray,
        fontSize: size.normal,
        fontWeight: '500',
        lineHeight:10,
        fontFamily: family.InterMedium,
      },
      txtsecond: {
        color: colors.gr1,
        fontSize: size.normal,
        fontWeight: '500',
        lineHeight:20,
        fontFamily: family.InterMedium,
      },
 
});

export default style;