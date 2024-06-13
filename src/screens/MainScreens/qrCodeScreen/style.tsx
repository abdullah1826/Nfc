import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { HP, WP } from "../../../shared/theme/PixelResponsive";
import { appRadius } from "../../../shared/theme/sizes";

// QR Code

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg1,
        padding: HP(3)
    },
    scanQRBox: {
        flex:1,
        alignSelf: 'center',
        marginTop: HP(3),
        // borderRadius: appRadius.boxRadius + 10
        justifyContent:"center",
        alignItems:"center",
    },
    footerContainer: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: HP(1),
        // paddingHorizontal: WP(5),
        // backgroundColor: 'lightblue',
        justifyContent: 'space-between',
        alignSelf:"center",
        // position:"absolute",
    // bottom:5,
    },
    imagePicker: {
        width: WP(9),
        height: HP(4.5)
    },
    ClickQrIcon: {
        width: WP(14),
        height: HP(7),
        resizeMode:"contain"
    },
    flashIcon: {
        width: WP(4.5),
        height: HP(3.5),
        resizeMode:"contain"
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      },
      camerastyle:{
      width:WP("80"),
       height:HP("60"),
       justifyContent:"center",
        alignItems:"center",
         alignSelf:"center",
      }
});

export default style;