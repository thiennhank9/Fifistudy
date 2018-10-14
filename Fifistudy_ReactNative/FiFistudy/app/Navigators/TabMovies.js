import { TabNavigator } from 'react-navigation';
import Res from '../Resources/index.js';

//Below import lines not working!!
// import {
//     ScreenMovieDetail,
//     ScreenMovieComment
// } from '../Screens/index.js';

import ScreenMovieDetail from '../Screens/ScreenMovieDetail.js';
import ScreenMovieComment from '../Screens/ScreenMovieComment.js';

const TabMovies = TabNavigator({
    'Thông tin': { screen: ScreenMovieDetail },
    'Bình luận': { screen: ScreenMovieComment }
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: Res.colors.blue,
            inactiveTintColor: 'white',
            labelStyle: {
                color: Res.colors.blue,
                fontSize: 14,
                fontWeight: 'bold',
            },
            style: {
                backgroundColor: Res.colors.background,
            }
        }
    });

export default TabMovies;