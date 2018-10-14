import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer: {
        width: width*0.82,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8
    },
    label: {
        minWidth: 90,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 8,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    textInput: {
        flex: 1,
        color: 'rgba(0, 0, 0, 0.6)',
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