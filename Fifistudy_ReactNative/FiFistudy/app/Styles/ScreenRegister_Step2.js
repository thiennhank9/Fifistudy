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
    body:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        width: width*0.6,
        fontSize: 17,
        color: Res.colors.blue,
        fontWeight: 'bold'
    },
    titleBtn: {
        textAlign: 'center',
        fontSize: 14,
        color: Res.colors.gray,
        marginTop: 8,
    },
    textInput: {
        fontSize: 21,
        paddingTop: 10,
        marginTop: 50,
        width: width*0.45,
        textAlign: 'center',
        color: Res.colors.blue,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: Res.colors.blue
    },
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationCircle: {
        height: 140,
        width: 140,
        borderRadius: 80,
        opacity: 0.3,
        position: 'absolute'
    },
    resultImage: {
        resizeMode: 'cover',
        width: 120,
        height: 120,
    },
    resultText: {
        marginTop: 32,
        fontSize: 17,
    },
    btnContainer: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        tintColor: Res.colors.blue,
        width: 20,
        height: 20,
    },
    btnContent: {
        color: Res.colors.blue,
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
        justifyContent: 'space-between',
    }
});
export default Styles;