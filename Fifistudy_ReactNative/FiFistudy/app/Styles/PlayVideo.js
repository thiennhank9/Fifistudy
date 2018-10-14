import { StyleSheet } from 'react-native';
import { window } from '../Themes/index.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'whitesmoke'
    },
    fullScreen: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: windows.width,
        height: windows.height,
        backgroundColor: 'black'
    }
})

export default styles;