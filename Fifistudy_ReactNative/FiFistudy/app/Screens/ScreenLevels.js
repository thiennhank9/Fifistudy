import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {LevelCard, ImageButton} from '../Components/index.js';
import Res from '../Resources/index';

export default class ScreenLevels extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                {/* Title section */}
                <View style={styles.titleContainer}>
                    <ImageButton source={Res.icons.back} tintColor={Res.colors.blue}
                        onPress={() => this.props.navigation.navigate('ScreenHome')}/>
                    <Text style={styles.title}>Độ khó</Text>
                </View>


                {/* <LevelCard level={0}/>
                <LevelCard level={1}/>
                <LevelCard level={2}/> */}

                
                <View style={styles.levelsContainer}>
                    <View style={[styles.levelCardcontainer, {
                        backgroundColor: Res.colors.levelHard,
                        transform: [{ rotate: '-30deg'}],
                        }]}>
                        <TouchableOpacity
                            onPress={() => navigate('ScreenListFilm', {title: 'Độ khó: Khó',difficultLevel:3})}>
                            <Text style={styles.label}>Khó</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.levelCardcontainer, {
                        backgroundColor: Res.colors.levelMedium,
                        transform: [{ rotate: '-5deg'}],
                        marginTop: -118
                        }]}>
                        <TouchableOpacity
                            onPress={() => navigate('ScreenListFilm', {title: 'Độ khó: Trung bình',difficultLevel:2})}>
                            <Text style={styles.label}>Trung bình</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.levelCardcontainer, {
                        backgroundColor: Res.colors.levelEasy,
                        transform: [{ rotate: '10deg'}],
                        marginTop: -120,
                        }]}>
                        <TouchableOpacity
                            onPress={() => navigate('ScreenListFilm', {title: 'Độ khó: Dễ',difficultLevel:1})}>
                            <Text style={styles.label}>Dễ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Res.colors.background,
    },
    titleContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        height: 56,
        width: '100%',
        position: 'absolute',
        zIndex: 3,
    },
    title: {
        fontFamily: Res.fonts.common,
        left: 72,
        fontSize: 21,
        color: Res.colors.blue,
        position: 'absolute'
    },
    levelCardcontainer: {
        width: '64%',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        margin: 8,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    label: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold'
    },
    levelsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});