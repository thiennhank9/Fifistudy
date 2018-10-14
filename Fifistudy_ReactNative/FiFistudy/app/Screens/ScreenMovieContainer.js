import React from 'react';
import ScreenMovies from '../Screens/ScreenMovies';
import {getFilm} from '../Redux/actions/screenMovie';
import {connect} from 'react-redux';
import {
    View,
    Text,
    Image,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native';

import {withNavigation} from 'react-navigation';
class ScreenMovieContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        this.props.getFilm(this.props.navigation.state.params.filmSlug);
    }

    render() {
        if (this.props.film.isLoading) {
            return (
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
        if (this.props.film.data === null) {
            return (
                <View>
                    <Text>
                        Loi
                    </Text>
                </View>
            )
        }

        if (this.props.film.data.error) {
            return (
                <View>
                    <Text>
                        Loi
                    </Text>
                </View>
            )
        }

        if (this.props.film.data.data)
            return (
                <ScreenMovies data={this.props.film.data.data}/>
            )
    }
}

const mapStateToProps = state => {
    return {

        film: state.screenMovie.film
    }
}

export default connect(mapStateToProps, {getFilm})(withNavigation(ScreenMovieContainer))