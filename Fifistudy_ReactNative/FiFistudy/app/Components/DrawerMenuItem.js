import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {ImageButton} from '../Components/index.js';
import Res from '../Resources/index.js';
import Styles from '../Styles/DrawerMenuItem.js';
import PropTypes from 'prop-types';

export default class DrawerMenuItem extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={Styles.container}>
                    {/* ICON */}
                    <ImageButton source={this.props.image} tintColor={Res.colors.gray}/>
                    {/* LABLE */}
                    <Text style={Styles.label}>{this.props.lable}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

DrawerMenuItem.defaultProps = {
    image: Res.icons.error,
    lable: 'Menu Item',
}

DrawerMenuItem.propTypes = {
    image: PropTypes.number,
    lable: PropTypes.string.isRequired,
}