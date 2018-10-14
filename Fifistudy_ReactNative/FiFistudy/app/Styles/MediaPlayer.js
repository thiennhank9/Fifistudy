import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        alignSelf: 'flex-end',
        width: width/3,
        height: height,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'blue',
        //alignItems: 'center',
        zIndex: 2
    },
    fullscreenContainer: {
        backgroundColor: 'black',
        flex: 1,
        zIndex: 1
    },
    videoContainer: {
        backgroundColor: 'black',
        width: width,
        height: width * Res.ratio,
        zIndex: 1
    },
    fullscreenMask: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
    },
    controlMask: {
        width: width,
        height: width * Res.ratio,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
    },
    playPauseBackForwardContainer: {
        flexDirection: 'row',
        width: width * 0.5,
        justifyContent: 'space-between',
        zIndex: 1
    },
    bottomControlsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        left: 8,
        bottom: 0,
        zIndex: 1
    },
    fullscreenSlider: {
        // width: width * 0.8,
        margin: 8,
        zIndex: 1
    },
    slider: {
        width: width * 0.7,
        margin: 8,
        zIndex: 1
    },
    track: {
        backgroundColor: '#757575',
        zIndex: 1
    },
    thumb: {
        backgroundColor: 'white',
        zIndex: 1
    },



    titleContainer: {
        marginTop: 16,
        marginBottom: 12,
        marginLeft: 16,
        marginRight: 16,
    },
    title: {
        fontFamily: Res.fonts.common,
        color: Res.colors.blue,
        fontSize: 24,
        marginBottom: 8
    },
    subtitle: {
        fontFamily: Res.fonts.common,
        color: Res.colors.subtitle,
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
        alignSelf: 'center'
    },
    btnBackToHome: {
        position: 'absolute',
        right: 0,
        top: 0,
        marginTop: 8,
        marginRight: 12
    }
});
export default styles;