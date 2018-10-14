import React, {Component} from "react";
import {withNavigation} from "react-navigation";
import {Text, View} from "react-native";
import ScreenListFilm from "./ScreenListFilm";
import {connect} from "react-redux";
import {getFilmByDifficultLevel,resetFilmByDifficultLevel} from "../Redux/actions/screenList";

class ScreenListFilmContainer extends Component {
    componentWillMount = () => {
        this.props.getFilmByDifficultLevel(this.props.navigation.state.params.difficultLevel);

    }

    // componentWillUnmount = () =>{
    //     this.props.resetFilmByDifficultLevel();
    // }

    render() {
        if (this.props.filmsByDifficultLevel.isLoading) {
            return (
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
        if (this.props.filmsByDifficultLevel.data === null) {
            return (
                <View>
                    <Text>
                        Lỗi
                    </Text>
                </View>
            )
        }

        if (this.props.filmsByDifficultLevel.data.error) {
            return (
                <View>
                    <Text>
                        Lỗi
                    </Text>
                </View>
            )
        }

        if (this.props.filmsByDifficultLevel.data.data)
            return (
                <ScreenListFilm title={this.props.navigation.state.params.title}
                                data={this.props.filmsByDifficultLevel.data.data}/>
            )
    }
}

const mapStateToProps = state => {
    return {
        filmsByDifficultLevel: state.screenList.filmsByDifficultLevel
    }
}

export default connect(mapStateToProps, {getFilmByDifficultLevel,resetFilmByDifficultLevel})(withNavigation(ScreenListFilmContainer))
