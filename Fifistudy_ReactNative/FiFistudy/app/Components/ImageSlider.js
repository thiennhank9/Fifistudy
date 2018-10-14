import React, {Component} from 'react';
import {baseUrl} from '../Server/config'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Animated,
    PanResponder,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const reactNativePackage = require('react-native/package.json');
const splitVersion = reactNativePackage.version.split('.');
const majorVersion = +splitVersion[0];   // version chinh
const minorVersion = +splitVersion[1];   // version phu

export default class ImageSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            height: Dimensions.get('window').width * (9 / 16),
            width: Dimensions.get('window').width,
            scrolling: false, // auto scroll ?
        };
    }

    onRef(ref) {
        this.ref = ref;
        if (ref && this.state.position !== this.getPosition()) {
            this.move(this.getPosition());
        }
    }

    move(index) {
        const isUpdating = index !== this.getPosition();
        const x = this.state.width * index;
        if (majorVersion === 0 && minorVersion <= 19) {
            this.ref.scrollTo(0, x, true); // use old syntax
        } else {
            this.ref.scrollTo({x: this.state.width * index, y: 0, animated: true});
        }
        this.setState({position: index});
        if (isUpdating && this.props.onPositionChanged) {
            this.props.onPositionChanged(index);
        }
    }

    getPosition() {
        // console.log('props: ', this.props.position);
         //console.log('state: ', this.state.position)
        // if (typeof this.props.position === 'number') {
        //     return this.props.position;
        // }
        return this.state.position;
    }

    select(index) {
        this.move(index);
        this.setState({position: index});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this.move(this.props.position);
        }
    }

    componentWillMount() {
        const width = this.state.with;
    
        let release = (e, gestureState) => {
            const width = this.state.width;
            const relativeDistance = gestureState.dx / width;
            const vx = gestureState.vx;
            let change = 0;

            if (relativeDistance < -0.5 || (relativeDistance < 0 && xv <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            const position = this.getPosition();
            if (position === 0 && change === -1) {
                change = 0;
            } else if (position + change >= this.props.dataSource.length) {
                change = (this.props.dataSource.length) - (position + change);
            }
            this.move(position + change);
            return true;
        };

        this.panResponder = PanResponder.create({
            onPanResponderRelease: release
        });

        this.interval = setInterval(() => {
            const newWidth = Dimensions.get('window').width;
            if (newWidth !== this.state.width){
                this.setState({width: newWidth});
            }
        }, 16);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const width = this.state.width;
        const height = this.props.height || this.state.height;
        const position = this.getPosition();

        return (
            <View style={[
                    this.props.containerStyle,
                    {height: height}
                ]}>
                {/* SECTION IMAGE */}
                <ScrollView
                    ref={ref => this.onRef(ref)}
                    decelerationRate={0.99}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={this.props.scrollEnabled}
                    {...this.panResponder.panHandlers}
                    style={[styles.container, 
                            { height: height, }
                    ]}>
                    {this.props.dataSource.map((image, index) => {
                        const imageObject = typeof image.film_detail.thumbnail240 === 'string' ? {uri: baseUrl+ image.film_detail.thumbnail240} : image.film_detail.thumbnail240;
                        const textComponent = (
                            <View style={styles.layoutText}>
                                {image.film_detail.english_name === undefined ? null : <Text style={styles.textTitle}>{image.film_detail.english_name}</Text>}
                                {image.film_detail.vietnamese_name === undefined? null : <Text style={styles.textCaption}>{image.film_detail.vietnamese_name}</Text>}
                            </View>
                        );
                        const imageComponent = (
                            <View key={index}>
                                <Image source={imageObject}
                                        style={{height, width}}/>
                                {textComponent}
                            </View>
                        );
                        const imageComponentWithOverlay = (
                            <View key={index} style={styles.containerImage}>
                                <View style={styles.overlay}>
                                    <Image source={imageObject}
                                            style={{height, width}}/>
                                </View>
                                {textComponent}
                            </View>
                        );
                        if (this.props.onPress) {
                            return (
                                <TouchableOpacity
                                key={index}
                                style={{height, width}}
                                delayPressIn={200}
                                onPress={() => this.props.onPress({image, index})}>
                                    {this.props.overlay ? imageComponentWithOverlay : imageComponent}
                                </TouchableOpacity>
                            );
                        } else {
                            return this.props.overlay ? imageComponentWithOverlay : imageComponent;
                        }
                    })}
                </ScrollView>

                {/* SECTION INDICATOR  */}
                <View style={styles.layoutIndicator}>
                    {this.props.dataSource.map((image, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => this.select(index)}
                                style={[
                                [
                                    styles.indicator,
                                    setIndicatorSize(this.props.indicatorSize),
                                    setIndicatorColor(this.props.indicatorColor)
                                ],
                                position === index &&[
                                    styles.indicatorSelected,
                                    setIndicatorColor(this.props.indicatorSelectedColor)
                                ]
                            ]}>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }
}

ImageSlider.defaultProps= {
    height: 200,
    indicatorSize: 8,
    indicatorColor: '#616161',
    indicatorSelectedColor: '#fafafa',
    scrollEnabled: true,
}

ImageSlider.propTypes = {
    // dataSource: PropTypes.arrayOf(PropTypes.shape({
	 //    title: PropTypes.string,
	 //    caption: PropTypes.string,
	 //    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // })).isRequired,
    indicatorSize: PropTypes.number,
    indicatorColor: PropTypes.string,
    height: PropTypes.number,
    position: PropTypes.number,
    scrollEnabled: PropTypes.bool,
    containerStyle: PropTypes.object,
    overlay: PropTypes.bool,
    onPress: PropTypes.func,
    onPositionChanged: PropTypes.func,
}

const setIndicatorSize = function(size) {
    return {
        width: size,
        height: size,
        borderRadius: size / 2,
    }
}

const setIndicatorColor = function(color) {
    return {
        backgroundColor: color,
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#222',
    },
    layoutIndicator: {
        height: 15,
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    indicator: {
        margin: 3,
        opacity: 0.9
    },
    indicatorSelected: {
        opacity: 1,
    },
    containerImage : {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    overlay: {
        opacity: 0.5,
        backgroundColor: 'black',
    },
    layoutText: {
        position: 'absolute',
        paddingHorizontal: 15,
        bottom: 30,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 15, 
        color: 'white',
    },
    textCaption: {
        fontWeight: '400',
        fontSize: 12, 
        color: 'white',
    }
});