import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Res from '../Resources/index.js';
import { ImageButton } from '../Components/index.js';
import Styles from '../Styles/ScreenRegister_Step3.js';

export default class ScreenRegister_Step3 extends Component{
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={Styles.container}>
                <View style={Styles.body}>
                    {/* Avatar */}
                    <View>
                        <Image style={Styles.avatar} source={Res.images.avatar}/>
                        <View style={Styles.cameraBtnContainer}>
                            <ImageButton source={Res.icons.camera} tintColor='white'/>
                        </View>
                    </View>

                    {/* Infomations */}
                    <View style={Styles.infoContainer}>
                        <View style={Styles.nameContainer}>
                            <TextInput style={Styles.lastNameTextInput}
                                placeholder='Họ và tên lót'
                                placeholderTextColor={Res.colors.gray}
                                underlineColorAndroid={Res.colors.gray}
                            />
                            <View style={{width: 8}}/>
                            <TextInput style={Styles.firstNameTextInput}
                                placeholder='Tên'
                                placeholderTextColor={Res.colors.gray}
                                underlineColorAndroid={Res.colors.gray}
                            />
                        </View>
                        <TextInput style={Styles.textInput}
                            placeholder='Số điện thoại'
                            placeholderTextColor={Res.colors.gray}
                            underlineColorAndroid={Res.colors.gray}
                        />
                        <TextInput style={Styles.textInput}
                            placeholder='Ngày sinh'
                            placeholderTextColor={Res.colors.gray}
                            underlineColorAndroid={Res.colors.gray}
                        />
                        <TextInput style={Styles.textInput}
                            placeholder='Địa chỉ'
                            placeholderTextColor={Res.colors.gray}
                            underlineColorAndroid={Res.colors.gray}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View style={Styles.footer}>
                    <TouchableOpacity onPress={() => navigate('ScreenHome')}>
                        <View style={Styles.btnContainer}>
                            <Image style={Styles.icon} source={Res.icons.close}/>
                            <Text style={Styles.btnContent}>Bỏ qua</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigate('Step4')}>
                        <View style={Styles.btnContainer}>
                            <Text style={Styles.btnContent}>Tiếp theo</Text>
                            <Image style={Styles.icon} source={Res.icons.moreArrow}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}