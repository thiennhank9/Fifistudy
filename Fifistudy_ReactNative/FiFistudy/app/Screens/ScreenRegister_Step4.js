import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Res from '../Resources/index.js';
import Styles from '../Styles/ScreenRegister_Step4.js';

export default class ScreenRegister_Step4 extends Component {
    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.imgContainer}>
                    {/* <View style={Styles.animationCircle}/> */}
                    <Image style={Styles.resultImage}
                        source={Res.images.congrats} />
                    <Text style={Styles.congratsText}>Chúc mừng bạn!!!</Text>
                    <Text style={Styles.congratsSubText}>Hãy khám phá xem Fifi có gì hay nhé!</Text>
                </View>
                {/* Footer */}
                <View style={Styles.footer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ScreenHome')}>
                        <View style={Styles.btnContainer}>
                            <Text style={Styles.btnContent}>Khám phá ngay</Text>
                            <Image style={Styles.icon} source={Res.icons.moreArrow} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}