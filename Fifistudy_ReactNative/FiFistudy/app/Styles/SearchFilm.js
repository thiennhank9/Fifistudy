import { StyleSheet, Dimensions } from 'react-native';
import res from '../Resources/index.js';
const width = Dimensions.get('window').width;
import lsFilm from '../Objects/ObjFilms.js';
import windows from '../Themes/Window.js';

export default styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        marginRight: 0,
        alignItems: 'center'
    },
    inputSearch: {
        width: 280,
        height: 50,
        backgroundColor: 'transparent'
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    bannerFilm: {
        width: windows.width * 1 / 4,
        height: windows.width * 1 / 6,
        margin: 10,
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleEng: {
        fontSize: 14,
        color: 'cornflowerblue'
    },
    titleVn: {
        fontSize: 12,
        color: 'grey'
    },

    lineColor: {
        margin: 10,
        height: 1,
        backgroundColor: 'grey'
    },
    container: {
        position: 'absolute',
        width: width,
        flexDirection: 'column',
        zIndex: 100 //very important to show this view on the top (view overlap view)
    },
    toolbar: {
        flexDirection: 'row',
        //width: width,
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        //position: 'absolute',
        zIndex: 100,
    },
})