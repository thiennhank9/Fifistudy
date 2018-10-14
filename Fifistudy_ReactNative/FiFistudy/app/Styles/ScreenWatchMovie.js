import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Resources from '../Resources/index.js';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Resources.colors.background
    },
    listEpisode: {
    },
    titleContainer: {
        marginTop: 16,
        marginBottom: 12,
        marginLeft: 16,
        marginRight: 16,
    },
    title: {
        fontFamily: Resources.fonts.common,
        color: Resources.colors.blue,
        fontSize: 24,
        marginBottom: 8
    },
    subtitle: {
        fontFamily: Resources.fonts.common,
        color: Resources.colors.subtitle,
        fontSize: 16
    },
    toolbar: {
        flexDirection: 'row',
        paddingLeft: 6,
        paddingRight: 6,
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        right: 0,
        backgroundColor: '#fafafa',
        borderRadius: 6,
        elevation: 8,
        margin: 8
    },
    listEpisode: {
        marginBottom: 48,
        
    }
});
export default styles;