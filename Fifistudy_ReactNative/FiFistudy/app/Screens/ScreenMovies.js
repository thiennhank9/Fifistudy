import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Animated,
    TouchableOpacity
} from 'react-native';
import {withNavigation} from 'react-navigation'
import {baseUrl} from '../Server/config'
import LinearGradient from 'react-native-linear-gradient';
import PopupDialog, {SlideAnimation, DialogTitle} from 'react-native-popup-dialog';
import styles from '../Styles/ScreenMovies.js';
import res from '../Resources/index.js';
import TabMovies from '../Navigators/TabMovies.js';
import {ImageButton} from '../Components/index.js';
import {ToolbarContainer} from '../Containers/index.js';
import ObjFilm from '../Objects/ObjFilm.js';
import stylesPopup from '../Styles/PopupListEpisode.js';
import windows from '../Themes/Window.js';
import lsEpisodes from '../Objects/ObjListEpisodes.js';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

class ScreenMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ds: lsEpisodes,
            isLiked: false,
            isBookmarked: false,
        }
        this.animatedValue = new Animated.Value(0.6);
    }

    componentWillMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0.3);
        Animated.spring(
            this.animatedValue,
            {
                toValue: 1,
                friction: 0.5,
            }
        ).start(() => this.animate());
    }

    renderItemEpisode(item) {
        return (
            <TouchableOpacity style={stylesPopup.itemEpisode}
                onPress={() => this.props.navigation.navigate('ScreenWatchMovie',{film:this.props.data,filmSlug:this.props.data.slug,episodeId:item.number})}>
                {/* onPress={() => this.props.navigation.dispatch(NavigationActions.back())}> */}
                <Text style={stylesPopup.textEpisode}>
                    {item.number}
                </Text>
                <View style={stylesPopup.blackLine}>
                </View>
            </TouchableOpacity>
        )
    }

    renderPopup() {
        return (
            <PopupDialog
                width={windows.width * (2 / 3)}
                dialogTitle={<DialogTitle title="Danh sách các tập"/>}
                ref={(popupDialog) => {
                    this.popupDialog = popupDialog
                }}
                dialogAnimation={slideAnimation}
                overlayOpacity={0.5}>
                {/* --- Component popup show --- */}
                <FlatList
                    data={this.state.ds}
                    renderItem={({item}) => this.renderItemEpisode(item)}
                >
                </FlatList>
            </PopupDialog>
        )
    }

    onFavoriteButtonPress(){
        let isLiked = this.state.isLiked;
        this.setState({isLiked: !isLiked});
    }

    onBookmarkButtonPress(){
        let isBookmarked = this.state.isBookmarked;
        this.setState({isBookmarked: !isBookmarked});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    {/* Toolbar */}
                    {/* <ToolbarContainer/> */}
                    <View style={styles.toolbar}>
                        <ImageButton
                                source={res.icons.back}
                                tintColor='white'
                                onPress={() => this.props.navigation.navigate('ScreenHome')} />
                        <View style={{flexDirection: 'row'}}>
                            <ImageButton source={res.icons.rating} tintColor='white'/>
                            <ImageButton source={this.state.isBookmarked ? res.icons.bookmarkFull : res.icons.bookmark}
                                tintColor='white'
                                onPress={() => this.onBookmarkButtonPress()}/>
                            <ImageButton source={this.state.isLiked ? res.icons.favoriteFull : res.icons.favorite}
                                tintColor='white'
                                onPress={() => this.onFavoriteButtonPress()}/>
                        </View>
                    </View>    
                
                    <Image
                        source={{uri: baseUrl+ this.props.data.thumbnail}}
                        style={styles.image}>
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0.5)', 'transparent']}
                            locations={[0.3, 1]}
                            style={styles.imgGradient}>
                        </LinearGradient>
                        <LinearGradient
                            colors={['transparent', res.colors.background]}
                            locations={[0.7, 1]}
                            style={styles.imgGradient}>
                        </LinearGradient>
                    </Image>
                    
                    <View style={styles.tabContainer}>
                        <TabMovies screenProps={this.props.data} />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.buttonFloatContainer}
                    onPress={() => this.popupDialog.show()}>
                    <Animated.View style={[styles.animatedButtonFloat, { transform: [{scale: this.animatedValue}]}]}/>
                    <Image source={res.icons.floatingBtn}
                        style={styles.buttonFloat}/>
                </TouchableOpacity>
                
                 <PopupDialog 
                    width={windows.width * (2 / 3)}
                    dialogTitle={<DialogTitle title="Danh sách các tập" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog }}
                    dialogAnimation={slideAnimation}
                    overlayOpacity={0.5}>
                     {/* --- Component popup show --- */}
                     <FlatList
                         data={this.props.data.episodes.sort((a,b)=>parseInt(a.number)-parseInt(b.number))}
                         renderItem={({ item }) => this.renderItemEpisode(item)}
                     >
                     </FlatList>
                 </PopupDialog>
            </View>


        )
    }
}

export default withNavigation(ScreenMovies);