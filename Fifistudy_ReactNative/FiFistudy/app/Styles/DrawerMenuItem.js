import { 
    StyleSheet,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';

const width = Dimensions.get('window').width;

const styles = {
    container: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginLeft: 72,
        position: 'absolute',
        zIndex: 1
    },
};
export default styles;