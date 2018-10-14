import {StyleSheet, Dimensions} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        opacity: 0.7,
        marginTop: -20
    },
    welcomeContainer: {
        marginTop: -16,
        alignItems: 'center'
    },
    welcomeContent: {
        color: 'white',
        fontSize: 20,
        // fontFamily: Res.fonts.light,
    },
    imgBackground: {
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    logo: {
        width: width*0.5,
        resizeMode: 'contain',
    },
    blackMask: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        width: width*0.46,
        borderRadius: 30,
        padding: 10,
        margin: 6,
    },
    btnContent: {
        color: 'white',
        fontSize: 17,
    },
    boxesContainer: {
        width: width*0.76,
        marginTop: 60,
        alignItems: 'center',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    icon: {
        width: 20,
        height: 20,
        margin: 8,
        resizeMode: 'cover',
        tintColor: 'white'
    },
    textInput: {
        flex: 1,
        marginLeft: 8,
        marginRight: 8,
        color: 'white',
        fontSize: 14,
    },
});

export default Styles;