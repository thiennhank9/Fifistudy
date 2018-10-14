import React, {Component} from 'react';
import {baseUrl} from '../Server/config'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Styles from '../Styles/FilmCardItem';
import Res from '../Resources/index';
import ImageButton from '../Components/ImageButton';
import EpisodeCircleView from '../Components/EpisodeCircleView';

export default class FilmCard extends Component {
    setBookmark(film) {
        if (film.isBookmark)
            return (
                <View style={[Styles.bookmark, {}]}>
                    <ImageButton source={Res.icons.bookmarkFull} tintColor={Res.colors.yellow}/>
                </View>
            );
    }

    constructor(props) {
        super(props);
    }

    getLevelColor(film) {
        let color = Res.colors.levelEasy;

        if (film.difficult_level === 2)
            color = Res.colors.levelMedium;
        if (film.difficult_level === 3)
            color = Res.colors.levelHard;

        return color;
    }

    render() {
        const {data} = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenMovies',{filmSlug:data.slug})}>
                <View style={Styles.container}>
                    {this.setBookmark(data)}
                    {/* Episode Group */}
                    <View style={Styles.episodeGroup}>
                        <EpisodeCircleView episodeNumber={data.episode_count} elevation={6}/>
                    </View>

                    {/* Film's image */}
                    <View style={Styles.groupFilmImgLevel}>
                        <Image source={{uri:baseUrl+ data.thumbnail240}}
                               style={Styles.filmImg}/>
                        {/* Level line */}
                        <View style={[Styles.levelLine, {backgroundColor: this.getLevelColor(data)}]}/>
                    </View>

                    {/* Title group */}
                    <View style={Styles.titleGroup}>
                        <Text style={Styles.titleEnglish} numberOfLines={1}>{data.english_name}</Text>
                        <Text style={Styles.titleVietnamese} numberOfLines={1}>{data.vietnamese_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}