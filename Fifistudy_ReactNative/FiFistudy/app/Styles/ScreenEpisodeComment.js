import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Resources from '../Resources/index.js';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        backgroundColor: Resources.colors.background,
    },
    toolbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8
    },
    title: {
        fontFamily: Resources.fonts.common,
        fontSize: 21,
        marginLeft: 72,
        color: Resources.colors.blue,
        position: 'absolute'
    },
    textInput: {
        flex: 1,
        backgroundColor: '#E0E0E0'
    },
    btnSend: {
        backgroundColor: Resources.colors.blue,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        height: 40
    },
    enterCommentContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 20,
        flexDirection: 'row',
    },
    line: {
        backgroundColor: Resources.colors.line,
        marginLeft: 16,
        marginRight: 16,
        height: 1,
    }
});
export default styles;