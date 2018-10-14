import {
    StyleSheet,
    Dimensions
} from 'react-native';
import Res from '../Resources/index';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        backgroundColor: Res.colors.background,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 3,
        alignItems: 'center'
    },
    image: {
        marginLeft: 6,
        marginRight: 6,
        resizeMode: 'cover',
        width: 80,
        height: 60
    },
    line: {
        width: 1,
        backgroundColor: Res.colors.line,
        height: '82%'
    },
    contentContainer: {
        padding: 8,
    },
    title: {
        fontFamily: Res.fonts.common,
        fontWeight: 'bold',
        width: width*0.6,
        marginBottom: 6
    },
    content: {
        width: width*0.6,
        fontFamily: Res.fonts.common,
    }
});
export default styles;