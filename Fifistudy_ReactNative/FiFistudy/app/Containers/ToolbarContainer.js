import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import {ImageButton} from '../Components/index.js';
import Styles from '../Styles/ToolbarContainer.js';
import res from '../Resources/index';

export default class ToolbarContainer extends Component {
    render() {
        return (
            <View style={Styles.toolbar}>
                <ImageButton
                    source={res.icons.back}
                    tintColor='white'/>

                <View style={{flexDirection: 'row'}}>
                    <ImageButton source={res.icons.rating} tintColor='white'/>
                    <ImageButton source={res.icons.bookmark} tintColor='white'/>
                    <ImageButton source={res.icons.favorite} tintColor='white'/>
                </View>
            </View>    
        );
    }
}