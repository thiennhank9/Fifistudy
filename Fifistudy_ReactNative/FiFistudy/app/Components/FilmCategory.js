import React from 'react';

import Styles from '../Styles/ScreenHome';
import {withNavigation} from 'react-navigation'

import res from '../Resources/index';
import {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {ImageButton} from '../Components/index';
import {FilmCardContainer} from '../Containers/index'

class FilmCategory extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <View>
                <View style={Styles.subtitleGroup}>
                    <Text style={Styles.subtitle}>Phim mới</Text>
                    <ImageButton source={res.icons.moreArrow} tintColor={res.colors.blue} />
                </View>
                <FilmCardContainer navigation={this.props.navigation} />
            </View>
        )
    }
}

export default withNavigation(FilmCategory)