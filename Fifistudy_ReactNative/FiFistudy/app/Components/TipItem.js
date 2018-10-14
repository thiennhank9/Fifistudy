import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import res from '../Resources/index';
import imageButton from '../Components/ImageButton';
import Styles from '../Styles/TipItem.js'



export default class TipItem extends Component {
    render(){
        const {data} = this.props;
        const {isActive} = this.props;

        return (
            // <View style={isActive?styles.activeContainer:styles.container}>
            <View style={Styles.container}>
                <Image
                    style={Styles.image}
                    source={{uri: 'http://www.corsielezioni.ch/oc-content/uploads/2/328_preview.jpg'}}/>

                <View style={Styles.line}/>

                <View style={Styles.contentContainer}>
                    <Text numberOfLines={1} style={Styles.title}>{data.title}</Text>
                    <Text numberOfLines={2} style={Styles.content}>{data.content}</Text>
                </View>
            </View>
        );
    }
}