import { StyleSheet } from 'react-native';

export default stylesPopup = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemEpisode: {
        flexDirection: 'column',
        margin: 10
    },
    blackLine: {
        marginTop: 5,
        height: 0.5,     
        backgroundColor: 'lavender'
    },
    textEpisode: {
        marginTop: 5,
        fontSize: 18,
        textAlign: 'center',
        color: 'lightblue',
    }
})