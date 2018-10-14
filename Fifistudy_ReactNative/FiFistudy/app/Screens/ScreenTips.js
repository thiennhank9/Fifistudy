import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import Res from '../Resources/index';
import {ImageButton} from '../Components/index.js';
import {TipContainer} from '../Containers/index.js';
import Styles from '../Styles/ScreenTips.js';

export default class ScreenTips extends Component {
    render() {
        return(
            <View style={Styles.container}>
                {/* Title section */}
                <View style={Styles.titleContainer}>
                    <ImageButton source={Res.icons.back} tintColor={Res.colors.blue}
                        onPress={() =>  this.props.navigation.navigate('ScreenHome')}/>
                    <Text style={Styles.title}>Tip</Text>
                </View>
                <View style={Styles.line}/>
                
                <TipContainer/>
            </View>
        )
    }
}