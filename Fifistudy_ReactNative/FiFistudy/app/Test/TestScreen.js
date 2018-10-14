import React, { Component } from 'react';
import { View } from 'react-native';
import ScreenWatchMovie from '../Screens/ScreenWatchMovie.js';
import FullScreenWatch from '../Screens/FullScreenWatch.js';

export default class TestScreen extends Component {
    render() {
        return (
            <FullScreenWatch />
        )
    }
}