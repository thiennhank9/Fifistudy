import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import DrawerApp from './Navigators/DrawerApp.js';
import store from './Redux/Store.js';
import { Provider } from 'react-redux';
import TestScreen from './Test/TestScreen.js';
console.disableYellowBox = true;

const isTest = false;

class App extends Component {
    render() {
        const screens = isTest ? <TestScreen /> : <DrawerApp />
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <Provider store={store}>
                    {screens}
                </Provider>
            </View>

        )
    }
}

export default App;