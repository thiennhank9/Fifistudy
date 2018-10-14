import React, { Component } from 'react';
import {withNavigation} from 'react-navigation'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import {ImageButton} from '../Components/index.js';
import {FilmListContainer} from '../Containers/index.js';
import Res from '../Resources/index.js';
import Styles from '../Styles/ScreenListFilm.js';

class ScreenListFilm extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={Styles.container}>
                <View style={Styles.titleContainer}>
                    <ImageButton source={Res.icons.back} tintColor={Res.colors.blue}
                        onPress={() => navigation.navigate('ScreenHome')}/>
                    <Text style={Styles.title}>{this.props.title}</Text>
                </View>
                <View style={Styles.line}/>

                <FilmListContainer data={this.props.data}/>
            </View>
        )
    }
}

export default withNavigation(ScreenListFilm);
