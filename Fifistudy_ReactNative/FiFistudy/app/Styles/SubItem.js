import {StyleSheet} from 'react-native';
import Res from '../Resources/index.js';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        opacity: 0.8
    },
    containerActive: {
        backgroundColor: Res.colors.blue,
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        marginRight: 8
    },
    subEnglish: {   
        fontFamily: Res.fonts.common,
        color: 'white',
        marginBottom: 4,
    },
    subVietnamese: {
        fontFamily: Res.fonts.common,
        color: 'white',
        opacity: 0.6
    },

});
export default styles;