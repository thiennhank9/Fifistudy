import {
    StyleSheet,
    Dimensions
} from 'react-native';
import Res from '../Resources/index';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
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
});
export default styles;