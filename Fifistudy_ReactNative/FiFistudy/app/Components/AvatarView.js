import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import Resources from '../Resources/index.js';

export default class AvatarView extends Component {
    render(){
        const imageObj = typeof this.props.source === 'string' ? {uri: this.props.source} : this.props.source;
        return (
            <Image
                style={[styles.image, {
                    height: this.props.size,
                    width: this.props.size,
                }]}
                resizeMode='cover'
                source={imageObj}
                elevation={this.props.showShadow ? 3 : 0}/>
        );
    }
}

AvatarView.defaultProps = {
    size: 48,
    source: Resources.images.default,
    showShadow: false,
}

AvatarView.propTypes = {
    source:  PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    size: PropTypes.number,
    showShadow: PropTypes.bool,
}

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    } 
});
