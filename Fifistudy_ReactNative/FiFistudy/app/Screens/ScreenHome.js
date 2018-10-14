import React, {Component} from 'react';
import {getPromotes, getLastest, getMostView} from '../Redux/actions/screenHome'
import {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Orientation from 'react-native-orientation';
import {bindAc} from 'redux';
import {connect} from 'react-redux';
import Styles from '../Styles/ScreenHome';
import res from '../Resources/index';
import {ImageButton, ImageSlider, Banner, FilmCategory} from '../Components/index.js';
import {
    BannerContainer,
    HistoryFilmsContainer,
    FilmCardContainer,
    TipContainer,
    NewFilmsContainer,
    MostViewContainer
} from '../Containers/index.js';
import {NavigationActions} from 'react-navigation';
import Obj from '../Objects/ObjTemp.js';
import {SearchFilm} from '../Components/index.js';

class ScreenHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // position: 1,
            interval: null,
        };
    }

    navigateToScreen(route) {
        this.setState({route: route});
        let navigationAction = NavigationActions.navigate({routeName: route});
        this.props.navigation.dispatch(navigationAction);
    }

    componentWillMount() {
        this.props.getPromotes();
        this.props.getLastest();
        this.props.getMostView();
        // Orientation.lockToPortrait();
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === Obj.sliderSource.length ? 0 : this.state.position + 1
                });
            }, 2000) // (postion, time to change image)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={Styles.container}
                showsVerticalScrollIndicator={false}>
                {/* <StatusBar hidden /> */}
                {/* TOOLBAR SECCTION */}
                {/* <SearchFilm navigation={this.props.navigation} /> */}
                <View style={Styles.toolbar}>
                    <ImageButton
                        onPress={() => this.navigateToScreen('DrawerToggle')}
                        source={res.icons.menu}
                        tintColor='white'/>
                    <View style={Styles.searchContainer}>
                        <ImageButton
                            onPress={() => this.navigateToScreen('ScreenSearchFilm')}
                            source={res.icons.search}
                            tintColor='white'/>
                    </View>
                </View>
                {/* SECTION BANNER SLIDER */}
                <View
                    style={Styles.bannerSlider}>
                    {/*<ImageSlider*/}
                    {/*navigation={this.props.navigation}*/}
                    {/*dataSource={Obj.sliderSource}*/}
                    {/*position={this.state.position}*/}
                    {/*onPostionChange={position => this.setState({ position })} />*/}
                    <BannerContainer/>
                </View>

                {/* SECTION HISTORY SLIDER */}
                {/* Title */}
                <View style={Styles.subtitleGroup}>
                    <Text style={Styles.subtitle}>
                        Phim đã xem
                        {
                            this.props.name
                        }
                    </Text>
                    <ImageButton source={res.icons.moreArrow} tintColor={res.colors.blue}/>
                </View>
                <HistoryFilmsContainer navigation={this.props.navigation}/>

                {/* NEWEST FILMS */}
                {/* Title */}
                <View style={Styles.subtitleGroup}>
                    <Text style={Styles.subtitle}>Phim mới</Text>
                    <ImageButton source={res.icons.moreArrow} tintColor={res.colors.blue}/>
                </View>
                {/*<FilmCardContainer navigation={this.props.navigation} />*/}
                <NewFilmsContainer/>
                {/* MOST VIEWED FILMS */}
                {/* Title */}
                <View style={Styles.subtitleGroup}>
                    <Text style={Styles.subtitle}>Xem nhiều</Text>
                    <ImageButton source={res.icons.moreArrow} tintColor={res.colors.blue}/>
                </View>
                {/*<FilmCardContainer navigation={this.props.navigation} />*/}
                <MostViewContainer/>
                {/* TIPS */}
                {/* Title */}
                <View style={Styles.subtitleGroup}>
                    <Text style={Styles.subtitle}>Tips</Text>
                    <ImageButton source={res.icons.moreArrow} tintColor={res.colors.blue}
                                 onPress={() => this.navigateToScreen('ScreenTips')}/>
                </View>
                <TipContainer navigation={this.props.navigation} numRender={4}/>


                {/* FOOTER */}
                {/* About section */}
                <View style={Styles.footer}>
                    <View style={Styles.line}/>
                    <Text style={Styles.devTeam}>Developer team: 2NSLP</Text>
                </View>

            </ScrollView>
        );
    }

}


export default connect(null, {getPromotes, getLastest, getMostView})(ScreenHome)


