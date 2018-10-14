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
        alignItems: 'center'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraBtnContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 30,
        position: 'absolute',
        bottom: -20,
        right: -20
    },
    avatar: {
        height: 82,
        width: 82,
        borderRadius: 6,
    },
    infoContainer: {
        width: width*0.8,
        marginTop: 50,
    },
    nameContainer: {
        flexDirection: 'row',
    },
    lastNameTextInput: {
        flex: 3,
        color: Res.colors.gray,
    },
    firstNameTextInput: {
        flex: 2,
        color: Res.colors.gray,
    },
    textInput: {
        marginTop: 8,
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