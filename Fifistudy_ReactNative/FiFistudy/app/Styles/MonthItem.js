import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        flexDirection: 'column',
    },

    containerTextAndLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    textContainer: {
        width: 70,
    },

    textMonth: {
        fontFamily: 'sans-serif-light',
        fontSize: 16,
        textAlign: 'left',
        color: 'lightslategrey',
        fontWeight: 'bold'
    },

    blackLine: {
        marginLeft: 10,
        flex: 1,
        height: 2,
        backgroundColor: 'gray',
    }
})

export default styles;