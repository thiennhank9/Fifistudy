import {
    StyleSheet,
    Dimensions
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const styles = {
    container: {
        flex: 1,
        backgroundColor: Res.colors.background
    },
    userBanner: {
        flexDirection: 'row',
        height: 100,
        width: width,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center'
    },
    avatar: {
        height: 56,
        width: 56,
        margin: 2,
        borderRadius: 200,
        resizeMode: 'contain',
        padding: 2
    },
    fullnameEmailContainer: {
        flexDirection: 'column',
        marginLeft: 20
    },
    fullname: {
        fontWeight: 'bold'
    },
    line: {
        height: 1,
        width: width * 0.8,
        backgroundColor: Res.colors.line,
        alignSelf: 'center',
        marginTop: 6,
        marginBottom: 6
    },
    lable: {
        marginLeft: 16,
        marginTop: 8,
        color: '#9E9E9E'
    }

};
export default styles;