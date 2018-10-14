import {
    StyleSheet,
    Dimensions    
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        elevation: 3,
        padding: 8,
        backgroundColor: Res.colors.background,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        alignItems: 'center'
    },
    image: {
        width: width * 0.26,
        height: width * 0.31 * Res.ratio,
        marginRight: 16,
        resizeMode: 'cover'
    },
    textContainer: {
        flex: 1
    },
    titleEnglish: {
        fontFamily: Res.fonts.common,
        fontSize: 17,
    },
    titleVietnameses: {
        fontFamily: Res.fonts.light,
        marginTop: 2
    },
    textLevel: {
        fontFamily: Res.fonts.common,
        marginTop: 6
    }
});
export default styles;