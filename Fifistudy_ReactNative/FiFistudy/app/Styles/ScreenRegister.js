import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Res.colors.background
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 8,
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stepLine: {
        marginTop: 18,
        position: 'absolute',
        height: 3,
        width: width*0.75,
        backgroundColor: Res.colors.lightgray
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleAnimation: {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: Res.colors.blue,
        opacity: 0.3,
        position: 'absolute'
    },
    circleStep: {
        // backgroundColor: Res.colors.blue,
        borderRadius: 30,
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stepNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    stepContent: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        // color: Res.colors.blue
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