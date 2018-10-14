import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import {
    ScreenNotes,
    ScreenHome,
    ScreenLevels,
    ScreenWatchMovie,
    ScreenEpisodeComment,
    ScreenMovieComment,
    ScreenVocabulary,
    ScreenMovies,
    ScreenListFilm,
    ScreenSearchFilm,
    ScreenTips,
    DrawerMenu,
    FullScreenWatch,
    ScreenCategories,
    ScreenLogin,
    ScreenRegister,
    ScreenMovieContainer,
    ScreenWatchMovieContainer,
    ScreenRegister_Step2,
    ScreenRegister_Step3,
    ScreenRegister_Step4,
    ScreenListFilmContainer
} from '../Screens/index.js';
import PopupListEpisode from '../Components/PopupListEpisode.js';
import ScreenRegister_Step1 from '../Screens/ScreenRegister_Step1';

const DrawerApp = DrawerNavigator({
    ScreenNotes: { screen: ScreenNotes },
    ScreenHome: { screen: ScreenHome },
    ScreenLevels: { screen: ScreenLevels },
    ScreenWatchMovie: { screen: ScreenWatchMovieContainer },
    ScreenEpisodeComment: { screen: ScreenEpisodeComment },
    ScreenMovieComment: { screen: ScreenMovieComment },
    ScreenVocabulary: { screen: ScreenVocabulary },
    PopupListEmpisode: { screen: PopupListEpisode },
    ScreenMovies: { screen: ScreenMovieContainer },
    ScreenSearchFilm: { screen: ScreenSearchFilm },
    ScreenListFilm: { screen: ScreenListFilmContainer },
    ScreenTips: { screen: ScreenTips },
    FullScreenWatch: { screen: FullScreenWatch },
    ScreenCategories: { screen: ScreenCategories },
    ScreenLogin: { screen: ScreenLogin },
    ScreenRegister: { screen: ScreenRegister },

    //Add below to fix navigation
    Step1: {screen: ScreenRegister_Step1},
    Step2: {screen:ScreenRegister_Step2},
    Step3: {screen: ScreenRegister_Step3},
    Step4: {screen: ScreenRegister_Step4}

}, {
        headerMode: 'none',
        initialRouteName: 'ScreenLogin',
        contentComponent: DrawerMenu,
    });

export default DrawerApp;