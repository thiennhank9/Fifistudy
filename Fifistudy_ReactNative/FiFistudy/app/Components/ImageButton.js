import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';
import res from '../Resources/index';

export default class ImageButton extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     showAnimateCircle: false,
        // };

        // this.animatedValue = new Animated.Value(0);
        // this.animatedValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0.5, 1]
        // });
    }

    // animate() {
    //     this.setState({
    //         showAnimateCircle: true,
    //     });
    //     this.animatedValue.setValue(0);
    //     Animated.timing(
    //         this.animatedValue,
    //         {
    //             toValue: 1,
    //             duration: 300
    //         }
    //     ).start(
    //         this.props.onPress,          
    //     );
    // }

    render(){
        // console.log(typeof this.props.onPress);
        return(    
            <TouchableOpacity
                // onPress={() => this.animate()}
                onPress={this.props.onPress}>
                {/* activeOpacity={0.3}> */}
                <View style={styles.container}>
                    {/* {this.state.showAnimateCircle && <Animated.View style={{
                        width: 44,
                        height: 44,
                        position: 'absolute',
                        borderRadius: 30,
                        backgroundColor: res.colors.blue,
                        opacity: 0.3,
                        transform: [{scale: this.animatedValue}]
                    }}/>} */}
                    <Image source={this.props.source}
                        style={[styles.image, {
                            tintColor: this.props.tintColor,
                            height: this.props.size,
                            width: this.props.size
                        }]}/>
                </View>
            </TouchableOpacity>
        );
    }
}

ImageButton.defaultProps = {
    source: res.icons.error,
    tintColor: res.colors.red,
    size: 24,
}

ImageButton.propTypes = {
    source: PropTypes.number.isRequired,
    tintColor: PropTypes.string,
    size: PropTypes.number,
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        margin: 10,
        padding: 2,
        resizeMode: 'cover',
    }
});