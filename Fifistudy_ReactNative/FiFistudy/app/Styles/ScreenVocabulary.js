import {StyleSheet} from 'react-native';
import Res from '../Resources/index.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Res.colors.background,
    },
    titleContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        height: 56,
        zIndex: 3,
    },
    title: {
        fontFamily: Res.fonts.common,
        left: 72,
        fontSize: 21,
        color: Res.colors.blue,
        position: 'absolute'
    },
    line: {
        backgroundColor: Res.colors.line,
        marginLeft: 16,
        marginRight: 16,
        height: 1,
        opacity: 0.3,
        elevation: 3
    }
});
export default styles;