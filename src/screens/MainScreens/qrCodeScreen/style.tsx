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
        width: WP(85),
        height: HP(78),
        backgroundColor: colors.b1,
        alignSelf: 'center',
        marginTop: HP(3),
        borderRadius: appRadius.boxRadius + 10
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: HP(1),
        paddingHorizontal: WP(5),
        // backgroundColor: 'lightblue',
        justifyContent: 'space-between',
        height: HP(8)
    },
    imagePicker: {
        width: WP(9),
        height: HP(4.5)
    },
    ClickQrIcon: {
        width: WP(14),
        height: HP(7)
    },
    flashIcon: {
        width: WP(4.5),
        height: HP(3.5)
    }
});

export default style;