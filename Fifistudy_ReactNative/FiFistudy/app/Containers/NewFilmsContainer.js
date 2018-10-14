import {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';


import {
    BannerContainer,
    HistoryFilmsContainer,
    FilmCardContainer,
    TipContainer,
} from '../Containers/index.js';
import {connect} from 'react-redux';
import React from 'react';

// import {FilmCardContainer} from '../Containers/FilmCardContainer';

class NewFilmsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.lastest.isLoading) {
            return (
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
        if (this.props.lastest.data.errors) {
            return (
                <View>
                    <Text>
                        Loi
                    </Text>
                </View>
            )
        }
        if (this.props.lastest.data.data == null) {

            return (
                <View>
                    <Text>
                        Loi
                    </Text>
                </View>
            )
        }
        return (
            <FilmCardContainer data={this.props.lastest.data.data}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        lastest: state.screenHome.lastest
    }
}


export default connect(mapStateToProps)(NewFilmsContainer)