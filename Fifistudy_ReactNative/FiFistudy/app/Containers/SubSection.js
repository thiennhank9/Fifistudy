import React, {Component} from 'react';
import {View} from 'react-native';
import Res from '../Resources/index.js';

export default class SubSection extends Component{
    render(){
        const width = Dimensions.get('window').width;
        return (
            <View style={{
                backgroundColor: Res.colors.filmSubBackground,
                width: width,
                height: width * Res.ratio,
            }}>
                {!!this.state.sub && <ListSub currentItem={this.state.currentItem} data={this.state.sub}/>}
            </View>
        )
    }
}