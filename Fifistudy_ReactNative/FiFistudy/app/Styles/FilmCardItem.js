import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import res from '../Resources/index';

const groupWidth = Dimensions.get('window').width / 2 - 24;

const styles = StyleSheet.create({
    container: {
        backgroundColor: res.colors.background,
        width: groupWidth,
        padding: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        elevation: 3,
        margin: 8
    },
    bookmark: {
        position: 'absolute',
        zIndex: 5,
        top: -10
    },
    episodeGroup: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: 0
    },
    filmImg: {
        width: (groupWidth - 6),
        height: (groupWidth - 6) * res.ratio,
        resizeMode: 'cover',
    },
    groupFilmImgLevel: {
        width: (groupWidth - 6),
        height: (groupWidth - 6) * res.ratio,
        margin: -5,
    },
    levelLine: {
        height: 3,
    },
    titleGroup: {
        marginTop: 14,
    },
    titleEnglish: {
        fontFamily: res.fonts.common,
        fontWeight: 'bold',
        width: groupWidth - 10,
        marginBottom: 3,
    },
    titleVietnamese: {
        width: groupWidth - 10,
        fontFamily: res.fonts.common,
    }
});

export default styles;