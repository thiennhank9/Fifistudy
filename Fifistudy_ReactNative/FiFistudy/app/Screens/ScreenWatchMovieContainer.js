import Orientation from 'react-native-orientation';
import React from 'react';
import {connect} from 'react-redux';
import {ScreenWatchMovie} from '../Screens/index';
import {withNavigation} from 'react-navigation';
import {getEpisode} from '../Redux/actions/screenWatchMovie';

import {
    View,
    Text,
    Image,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native';

class ScreenWatchMovieContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentWillMount = () =>{
        this.props.getEpisode(this.props.navigation.state.params.filmSlug,this.props.navigation.state.params.episodeId)
        //console.log('screenwatch',this.props.navigation.state.params.filmSlug,this.props.navigation.state.params.episodeId)
    }
    render(){
        if (this.props.episode.isLoading){
            return (
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
        if (this.props.episode.data===null){
            return (
                <View>
                    <Text>
                        Loi
                    </Text>
                </View>
            )
        }
        if (this.props.episode.data.errors){
            return (
                <View>
                    <Text>
                        Loi
                    </Text>
                </View>
            )
        }
        return (
            <ScreenWatchMovie filmData={this.props.navigation.state.params.film} episodeData={this.props.episode.data.data}/>
        )
    }
}

const mapStateToProps = state =>    {
    return {
        episode:state.screenWatchMovie.episode
    }
}

export default connect(mapStateToProps,{getEpisode})(withNavigation(ScreenWatchMovieContainer))