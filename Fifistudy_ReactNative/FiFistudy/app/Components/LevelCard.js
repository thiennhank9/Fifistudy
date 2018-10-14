import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Res from '../Resources/index.js';

export default class LevelCard extends Component {
    getLabel() {
        let label = 'Dễ';
        if (this.props.level === 1)
            label = 'Trung bình';
        if (this.props.level === 2)
            label = 'Khó';
        
        return label;
    }

    getColor() {
        let color = Res.colors.violet; // Dễ
        if (this.props.level === 1)     // Trung bình
            color = Res.colors.yellow;
        if (this.props.level === 2)     // Khó
            color = Res.colors.red;

        return color;
    }

    render() {
        return(
            <View style={[styles.container, {backgroundColor: this.getColor()}]}>
                <Text style={styles.label}>
                    {this.getLabel()}
                </Text>
            </View>
        )
    }
}

LevelCard.defaultProps = {
    level: 0,
};

LevelCard.propTypes = {
    level: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Res.colors.violet,
        borderRadius: 8,
        elevation: 5,
        margin: 8
    },
    label: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold'
    }
});