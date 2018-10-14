import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import ObjFilm from '../Objects/ObjFilm.js';
import ObjEpisode from '../Objects/ObjEpisode.js';
import Res from '../Resources/index.js';


export default class MediaSubPlayer extends Component {
    render() {
        const width = Dimensions.get('window').width;
        return (
            <View>
                {/* MEDIA PLAYER SECTION */}
                <View style={{
                    backgroundColor: 'black',
                    width: width,
                    height: width * Res.ratio,
                }}>
                    
                </View>

                {/* SUB SECTION */}
                <View style={{
                    backgroundColor: 'lightgray',
                    width: width,
                    height: width * Res.ratio,
                }}>

                </View>
            </View>
        );
    }
}