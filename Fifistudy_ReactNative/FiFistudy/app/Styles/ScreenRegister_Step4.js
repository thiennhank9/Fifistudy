import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationCircle: {
        height: 140,
        width: 140,
        borderRadius: 80,
        opacity: 0.3,
        position: 'absolute',
        backgroundColor: Res.colors.blue
    },
    resultImage: {
        resizeMode: 'cover',
        width: 180,
        height: 180,
    },
    congratsText: {
        marginTop: 26,
        fontSize: 21,
        color: Res.colors.blue
    },
    congratsSubText: {
        marginTop: 8,
        fontSize: 17,
        color: Res.colors.gray
    },
    btnContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Res.colors.blue,
        borderRadius: 30,
    },
    icon: {
        tintColor: 'white',
        width: 20,
        height: 20,
    },
    btnContent: {
        color: 'white',
        fontSize: 17,
        marginLeft: 8,
        marginRight: 8
    },
    footer: {
        width: width,
        flexDirection: 'row',
        bottom: 8,
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
    }
});

export default Styles;