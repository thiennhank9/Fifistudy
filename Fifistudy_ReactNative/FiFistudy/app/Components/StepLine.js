import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Res from '../Resources/index.js';
import Styles from '../Styles/ScreenRegister.js';
import { ScreenRegister_Step1 } from './index';

export default class ScreenRegister extends Component{
    getCircleStep(stepNumber){
        let properties = {
            color: Res.colors.lightgray,
            isShowCircleAnimation: false,
        }
        if (stepNumber === this.props.curStep){
            properties = {
                color: Res.colors.blue,
                isShowCircleAnimation: true,
            };
        }   

        return (
            <View style={Styles.stepContainer}>
                <View style={Styles.circleContainer}>
                    {properties.isShowCircleAnimation && <View style={Styles.circleAnimation}/>}
                    <View style={[Styles.circleStep, {backgroundColor: properties.color}]}>
                        <Text style={Styles.stepNumber}>{stepNumber}</Text>
                    </View>
                </View>
                <Text style={[Styles.stepContent, {color: properties.color}]}>Xác nhận</Text>
            </View>
        );
    }

    getLineWidth(){
        let width = Dimensions.get('window').width;
        return width*0.25*(this.props.curStep - 1);
    }

    render() {
        const curStep = this.props.curStep;
        return (
            <View style={Styles.container}>
                <View style={Styles.stepsContainer}>
                    <View style={Styles.stepLine}>
                        <View style={{
                            height: 4,
                            width: this.getLineWidth(),
                            backgroundColor: Res.colors.blue
                        }}/>
                    </View>

                    {this.getCircleStep(1)}
                    {this.getCircleStep(2)}
                    {this.getCircleStep(3)}
                    {this.getCircleStep(4)}
                </View>
            </View>
        );
    }
}