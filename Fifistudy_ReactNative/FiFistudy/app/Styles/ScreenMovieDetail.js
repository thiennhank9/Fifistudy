import { StyleSheet } from 'react-native';
import Res from '../Resources/index.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 16,
        marginBottom: 6,
    },
    txtHeader: {
        marginTop: 8,
        fontSize: 24,
        color: Res.colors.blue,
    },
    txtFilm: {
        fontSize: 17,
    },
    rateContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconWithText: {
        flexDirection: 'row',
        flex: 1,
    },
    icon: {
        width: 15,
        height: 15
    },
    purpletxt: {
        textAlign: 'center',
        color: 'purple',
        marginLeft: 10
    },
    greentxt: {
        textAlign: 'center',
        color: 'green',
        marginLeft: 10,
    },
    italictxt: {
        fontStyle: 'italic'
    },
    horiContainer: {
        flexDirection: 'row'
    },
    spacetxt: {
        marginLeft: 10
    },
    spacetop: {
        marginTop: 28
    },
    boldReview: {
        fontWeight: 'bold'
    },
    scroll: {
        marginTop: 10,
        marginLeft: 8,
        flex: 1
    }
})

export default styles;