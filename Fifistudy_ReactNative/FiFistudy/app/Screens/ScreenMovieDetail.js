import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import {withNavigation} from 'react-navigation';

import styles from '../Styles/ScreenMovieDetail.js';
import res from '../Resources/index.js';
import ObjFilm from '../Objects/ObjFilm.js';

class ScreenMovieDetail extends Component {

    getDificultLevel(film){
        let level = 'Dễ';
        if (film.difficult_level === 2) level = 'Trung bình';
        if (film.difficult_level === 3) level = 'Khó';

        return level;
    }

    render() {
        const data=this.props.screenProps;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.txtHeader}>
                    {data.english_name}
                </Text>
                <Text style={styles.txtFilm}>
                    {data.vietnamese_name}
                </Text>

                <View style={styles.rateContainer}>
                    <View style={styles.iconWithText}>
                        <Image
                            source={res.green_star}
                            resizeMode='stretch'
                            style={styles.icon}
                        />
                        <Text style={styles.greentxt}>
                            {data.average_score}
                        </Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Image
                            source={res.purple_chart}
                            resizeMode='stretch'
                            style={styles.icon}
                        />
                        <Text style={styles.purpletxt}>
                            {this.getDificultLevel(data)}
                        </Text>
                    </View>
                </View>

                <View style={styles.spacetop}>
                </View>
                <View style={styles.horiContainer}>
                    <Text style={styles.italictxt}>
                        Số tập
                    </Text>
                    <Text style={styles.spacetxt}>
                        {data.episode_number}
                    </Text>
                </View>
                <View style={styles.horiContainer}>
                    <Text style={styles.italictxt}>
                        Thể loại
                    </Text>
                    <Text style={styles.spacetxt}>
                        {/* {ObjFilm.category} */}
                    </Text>
                </View>
                <View style={styles.horiContainer}>
                    <Text style={styles.italictxt}>
                        Diễn viên
                    </Text>
                    <Text style={styles.spacetxt}>
                        {/* {ObjFilm.cast} */}
                    </Text>
                </View>

                
                <View style={styles.spacetop}>
                </View>
                <Text style={styles.boldReview}>
                    Sơ lược phim
                </Text>
                <ScrollView style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}>
                    <Text>
                        {data.description}
                    </Text>
                </ScrollView>
            </ScrollView>
        )
    }
}

export default withNavigation(ScreenMovieDetail);