import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import Res from '../Resources/index.js';

export default class ErrorContainer extends Component {
    render(){
        return(
            <View style={Styles.container}>
                <Image source={Res.images.notFound}
                    style={Styles.image}/>
                <Text style={Styles.title}>Đã có lỗi xảy ra!</Text>
                <Text style={Styles.subTitle}>Vui lòng kiểm tra lại kết nối mạng.</Text>

            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Res.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        color: Res.colors.blue
    },
    subTitle: {
        fontSize: 14,
        marginTop: 8,
        color: Res.colors.gray
    }

});