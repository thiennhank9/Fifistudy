import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import Res from '../Resources/index';
import {ImageButton} from '../Components/index.js';
import {VocabulariesContainer} from '../Containers/index.js';
import Styles from '../Styles/ScreenVocabulary.js';
import {NavigationActions} from 'react-navigation';

export default class ScreenVolcabulary extends Component {
    render() {
        return(
            <View style={Styles.container}>
                {/* Title section */}
                <View style={Styles.titleContainer}>
                    <ImageButton source={Res.icons.close} tintColor={Res.colors.blue}
                        onPress={() =>  this.props.navigation.dispatch(NavigationActions.back())}/>
                    <Text style={Styles.title}>Từ vựng</Text>
                </View>
                <View style={Styles.line}/>
                
                <VocabulariesContainer/>
            </View>
        )
    }
}