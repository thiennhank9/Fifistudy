import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Res from '../Resources/index.js';
import Styles from '../Styles/ScreenRegister.js';
import { ScreenRegister_Step1 } from './index';

export default class ScreenRegister extends Component{
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={Styles.container}>
                {/* Header */}
                {/* <Image source={Res.images.login_background[1]} blurRadius={2}/> */}
                {/* <View style={Styles.titleContainer}>
                    <ImageButton source={Res.icons.back} tintColor={Res.colors.blue}
                        onPress={() => this.props.navigation.navigate('ScreenHome')}/>
                    <Text style={Styles.title}>Đăng kí</Text>
                </View> */}
                <View style={Styles.stepsContainer}>
                    <View style={Styles.stepLine}>
                        <View style={{
                            height: 4,
                            width: '28%',
                            backgroundColor: Res.colors.blue
                        }}/>
                    </View>

                    <View style={Styles.stepContainer}>
                        <View style={Styles.circleContainer}>
                            {/* <View style={Styles.circleAnimation}/> */}
                            <View style={[Styles.circleStep, {backgroundColor: Res.colors.blue}]}>
                                <Text style={Styles.stepNumber}>1</Text>
                            </View>
                        </View>
                        <Text style={[Styles.stepContent, {color: Res.colors.blue}]}>Tạo tài khoản</Text>
                    </View>
                    <View style={Styles.stepContainer}>
                        <View style={Styles.circleContainer}>
                            <View style={Styles.circleAnimation}/>
                            <View style={[Styles.circleStep, {backgroundColor: Res.colors.blue}]}>
                                <Text style={Styles.stepNumber}>2</Text>
                            </View>
                        </View>
                        <Text style={[Styles.stepContent, {color: Res.colors.blue}]}>Xác nhận</Text>
                    </View>
                    <View style={Styles.stepContainer}>
                        <View style={Styles.circleContainer}>
                            {/* <View style={Styles.circleAnimation}/> */}
                            <View style={[Styles.circleStep, {backgroundColor: Res.colors.lightgray}]}>
                                <Text style={Styles.stepNumber}>3</Text>
                            </View>
                        </View>
                        <Text style={[Styles.stepContent, {color: Res.colors.lightgray}]}>Nhập thông tin</Text>
                    </View>
                    <View style={Styles.stepContainer}>
                        <View style={Styles.circleContainer}>
                            {/* <View style={Styles.circleAnimation}/> */}
                            <View style={[Styles.circleStep, {backgroundColor: Res.colors.lightgray}]}>
                                <Text style={Styles.stepNumber}>4</Text>
                            </View>
                        </View>
                        <Text style={[Styles.stepContent, {color: Res.colors.lightgray}]}>Hoàn thành</Text>
                    </View>
                </View>

                {/* Body */}
                <View style={{
                    flex: 1,
                }}>
                    {/* <ScreenRegister_Step1/> */}
                    {/* <ScreenRegister_Step2/> */}
                    {/* <ScreenRegister_Step3/> */}
                    {/* <ScreenRegister_Step4/> */}

                    {/* //Change Step1 not TabNavigator */}
                    <ScreenRegister_Step1 navigation={this.props.navigation}/>
                </View>

                {/* Footer */}
                {/* <View style={Styles.footer}>
                    <TouchableOpacity onPress={() => navigate('ScreenLogin')}>
                        <View style={Styles.btnContainer}>
                            <Image style={Styles.icon} source={Res.icons.back}/>
                            <Text style={Styles.btnContent}>Quay lại</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={Styles.btnContainer}>
                            <Text style={Styles.btnContent}>Tiếp theo</Text>
                            <Image style={Styles.icon} source={Res.icons.moreArrow}/>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }
}