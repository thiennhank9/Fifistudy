import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { ImageButton } from '../Components/index.js';
import Res from '../Resources/index.js';
import Styles from '../Styles/ScreenRegister_Step1.js';

export default class ScreenRegister_Step1 extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={Styles.container}>
                <View style={Styles.body}>
                    <View style={Styles.subContainer}>
                        <View style={Styles.row}>
                            <Text style={Styles.label}>Tên tài khoản</Text>
                            <TextInput style={Styles.textInput}
                                underlineColorAndroid={Res.colors.gray}
                            />
                        </View>
                        <View style={Styles.row}>
                            <Text style={Styles.label}>Email</Text>
                            <TextInput style={Styles.textInput}
                                underlineColorAndroid={Res.colors.gray}
                            />
                        </View>
                        <View style={Styles.row}>
                            <Text style={Styles.label}>Mật khẩu</Text>
                            <TextInput style={Styles.textInput}
                                underlineColorAndroid={Res.colors.gray}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={Styles.row}>
                            <Text style={Styles.label}>Nhập lại mật khẩu</Text>
                            <TextInput style={Styles.textInput}
                                underlineColorAndroid={Res.colors.gray}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>

                <View style={Styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHome')}>
                        <View style={Styles.btnContainer}>
                            <Image style={Styles.icon} source={Res.icons.back} />
                            <Text style={Styles.btnContent}>Quay lại</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Step2')}>
                        <View style={Styles.btnContainer}>
                            <Text style={Styles.btnContent}>Tiếp theo</Text>
                            <Image style={Styles.icon} source={Res.icons.moreArrow} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
