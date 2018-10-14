import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import res from '../Resources/index';

export default class EpisodeCircleView extends Component {
    onPressEpisode = () =>{
        if (this.props.onClickButton){
            if (typeof  this.props.onClickButton=='function'){
                this.props.onClickButton(this.props.episodeNumber)
            }
        }
    }
    render(){
        return (
            <TouchableOpacity onPress={this.onPressEpisode} style={[styles.cicle,
                {
                    backgroundColor: this.props.color,
                    height: this.props.size,
                    width: this.props.size,
                    elevation: this.props.elevation,
                }]}>
                <Text style={[styles.episodeNumber, {
                    color: this.props.textColor,
                }]}>
                    {this.props.episodeNumber}
                </Text>
            </TouchableOpacity>
        );
    }
}

EpisodeCircleView.defaultProps = {
    episodeNumber: 0,
    color: res.colors.blue,
    textColor: 'white',
    size: 36,
    elevation: 0,
}

EpisodeCircleView.propTypes = {
    episodeNumber: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    color: PropTypes.string,
    textColor: PropTypes.string,
    size: PropTypes.number,
    elevation: PropTypes.number,
}


const styles = StyleSheet.create({
    cicle: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    episodeNumber: {
        fontFamily: res.fonts.common,
        fontWeight: 'bold',
        fontSize: 17
    }
});