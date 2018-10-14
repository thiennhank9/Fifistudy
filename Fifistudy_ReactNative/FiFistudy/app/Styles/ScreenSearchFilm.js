import { 
    StyleSheet,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Res.colors.background,
    },
    textInput: {
        flex: 1,
        color: Res.colors.blue,
        fontSize: 21,
        marginLeft: 12,
        paddingTop: 0,
        paddingBottom: 0
    },

    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8
    },

    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    bannerFilm: {
        width: width * 1 / 3,
        height: width * 1 / 4,
        margin: 10,
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleEng: {
        fontSize: 18,
        color: 'cornflowerblue'
    },
    titleVn: {
        fontSize: 16,
        color: 'grey'
    },

    lineColor: {
        margin: 10,
        height: 1,
        backgroundColor: 'grey'
    },
    line: {
        backgroundColor: Res.colors.line,
        marginLeft: 16,
        marginRight: 16,
        height: 1,
        opacity: 0.5,
        elevation: 3
    }
})