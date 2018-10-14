import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import {ImageButton} from '../Components/index.js';
import {CategoryContainer} from '../Containers/index.js';
import Res from '../Resources/index.js';
import Styles from '../Styles/ScreenCategories.js';

export default class ScreenCategories extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={Styles.container}>
                <View style={Styles.titleContainer}>
                    <ImageButton source={Res.icons.back} tintColor={Res.colors.blue}
                        onPress={() => navigation.navigate('ScreenHome')}/>
                    <Text style={Styles.title}>Thể loại</Text>
                </View>
                <View style={Styles.line}/>

                <CategoryContainer navigation={this.props.navigation}/>
            </View>
        );
    }
}