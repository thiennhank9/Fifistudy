import React, { Component } from 'react';
import {baseUrl} from '../Server/config'
import {
    Image,
    TouchableOpacity,
    Text,
    View,
    Dimensions
} from 'react-native';
import Res from '../Resources/index.js';
import Styles from '../Styles/FilmListItem.js';
import {withNavigation} from 'react-navigation';

class ScreenSearchFilm extends Component {
    getLevel(data){
        let level = {name: 'Dễ', color: Res.colors.levelEasy}
        if (data.difficult_level === 2)
            level = {name: 'Trung bình', color: Res.colors.levelMedium}
        if (data.difficult_level === 3)
            level = {name: 'Khó', color: Res.colors.levelHard}

        return level;
    }

    render() {
        const width = Dimensions.get('window').width;
        const {data} = this.props;
        const level = this.getLevel(data);

        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenMovies',{filmSlug:data.slug})}>
                <View style={Styles.container}>
                    <Image
                        source={{uri:baseUrl+ data.thumbnail240}}
                        style={Styles.image}
                    />
                    <View style={Styles.textContainer}>
                        <Text
                            numberOfLines={1}
                            style={Styles.titleEnglish}>
                            {data.english_name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={Styles.titleVietnameses}>
                            {data.vietnamese_name}
                        </Text>
                        {/* Level*/}
                        <Text style={[Styles.textLevel, {color: level.color}]}>
                            {level.name}
                        </Text>

                        {/* <View style={{
                            height: 1,
                            marginTop: 6,
                            backgroundColor: level.color,
                            marginRight: 8
                        }}/> */}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(ScreenSearchFilm)