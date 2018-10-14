import {
    StyleSheet,
    Dimensions
} from 'react-native';
import Res from '../Resources/index';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        marginRight: 0
    },
    inputSearch: {
        width: 270,
    },
    container: {
        backgroundColor: Res.colors.homePageBackground,
        flexGrow: 1,
        alignItems: 'center'
    },
    toolbar: {
        flexDirection: 'row',
        width: width,
        height: 56,
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        position: 'absolute',
        zIndex: 5,
    },
    bannerSlider: {
        width: width,
        height: width / 2,
        backgroundColor: 'lightgray',
        zIndex: 0
    },
    subtitleGroup: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingLeft: 16
    },
    subtitle: {
        fontFamily: Res.fonts.common,
        fontWeight: 'bold',
        color: Res.colors.blue,
        fontSize: 17,
    },
    line: {
        backgroundColor: Res.colors.line,
        marginLeft: 16,
        marginRight: 16,
        height: 1,
        opacity: 0.5,
        elevation: 3
    },
    footer: {
        width: width,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    devTeam: {
        fontFamily: Res.fonts.light,
        margin: 8,
        opacity: 0.6
    }
});

export default styles;