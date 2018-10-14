import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Resources from '../Resources/index.js';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row'
    },
    contentContainer: {
        flex: 1,
        marginLeft: 16
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accountName: {
        fontFamily: Resources.fonts.common,
        fontWeight: 'bold'
        // color: Resources.colors.blue,
    },
    dateTime: {
        fontFamily: Resources.fonts.light,
        color: Resources.colors.body,
    },
    comment: {
        fontFamily: Resources.fonts.common,
        color: Resources.colors.body,
        marginRight: 16,
    },
    likedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        marginBottom: 8,
    },
    likedNum: {
        fontFamily: Resources.fonts.common,
    },
    line: {
        backgroundColor: Resources.colors.line,
        height: 1,
    }
});

export default styles;