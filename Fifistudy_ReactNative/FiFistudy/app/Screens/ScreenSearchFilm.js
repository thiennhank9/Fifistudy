import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
} from 'react-native';
import {
    ImageButton,
} from '../Components/index.js';
import {getSearch} from '../Redux/actions/screenList'
import {connect} from 'react-redux';
import {FilmListContainer} from '../Containers/index.js';
import styles from '../Styles/ScreenSearchFilm.js';
import Res from '../Resources/index.js';

class ScreenSearchFilm extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchString: '',
        }
    }

    // renderItemFilm(item) {
    //     return (
    //         <View style={{ flexDirection: 'column' }}>
    //             <TouchableOpacity
    //                 onPress={() => this.clickItemFilm()}
    //                 style={styles.itemContainer}>
    //                 <Image
    //                     source={item.banner}
    //                     style={styles.bannerFilm}
    //                     resizeMod='stretch'
    //                 />
    //                 <View style={styles.textContainer}>
    //                     <Text
    //                         numberOfLines={2}
    //                         ellipsizeMode='tail'
    //                         style={styles.titleEng}>
    //                         {item.title_english}
    //                     </Text>
    //                     <Text
    //                         numberOfLines={2}
    //                         ellipsizeMode='tail'
    //                         style={styles.titleVn}>
    //                         {item.title_vn}
    //                     </Text>
    //                     <View style={{ marginTop: 10, marginLeft: 4, height: 2, width: 200, backgroundColor: item.color, }}>
    //                     </View>
    //                 </View>
    //             </TouchableOpacity>
    //             <View style={styles.lineColor}>
    //             </View>
    //         </View>
    //     )
    // }
    onChangeSearchText(text){
        this.setState({
            searchString: text,
        });
        this.props.getSearch(text,"created_at",1,10)
    }

    renderFilmList = () =>{
        if (this.props.search.isLoading) {
            return (
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
        if (this.props.search.data === null) {
            return (
                <View>
                    <Text>
                        Lỗi
                    </Text>
                </View>
            )
        }

        if (this.props.search.data.error) {
            return (
                <View>
                    <Text>
                        Lỗi
                    </Text>
                </View>
            )
        }

        if (this.props.search.data.data)
            return (
                <FilmListContainer data={this.props.search.data.data.films}/>
            )

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                {/* {this.renderSearchBar()} */}
                {/* Search bar */}
                <View style={styles.searchBarContainer}>
                    <ImageButton source={Res.icons.back} tintColor={Res.colors.blue}
                        onPress={() => navigation.navigate('ScreenHome')}/>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={Res.colors.blue}
                        underlineColorAndroid='transparent'
                        placeholder='Nhập tên phim cần tìm...'
                        onChangeText={(text) => this.onChangeSearchText(text)}
                        onSubmitEditing={this.onSubmitEditing}
                    />
                </View>
                <View style={styles.line}/>
                {
                    this.renderFilmList()
                }

                {/*<FilmListContainer navigation={navigation} data={this.} searchString={this.state.searchString}/>                */}
            </View>
        )
    }
}

const mapStateToProps = state =>    {
    return {
        search:state.screenList.search
    }
}

export default connect(mapStateToProps,{getSearch})(ScreenSearchFilm)