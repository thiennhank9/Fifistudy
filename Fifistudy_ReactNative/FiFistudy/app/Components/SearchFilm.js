import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableHighlight, Image, FlatList } from 'react-native';
import styles from '../Styles/SearchFilm.js';
import res from '../Resources/index.js';
import ImageButton from './ImageButton.js';
import lsFilm from '../Objects/ObjFilms.js';
import windows from '../Themes/Window.js';

export default class SearchFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            text: '',
            ds: lsFilm
        }
    }

    toggleInput() {
        this.setState({
            showInput: !this.state.showInput
        });
    }

    renderInputSearch() {
        if (this.state.showInput)
            return (
                <TextInput
                    style={styles.inputSearch}
                    //onFocus={() => this.toggleCancel()}
                    onChangeText={(text) => this.setState({ text })}
                    placeholder='Nhập tên phim cần tìm' />
            )
        else return null;
    }

    renderItemFilm(item) {
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity
                    onPress={() => this.clickItemFilm()}
                    style={styles.itemContainer}>
                    <Image
                        source={item.banner}
                        style={styles.bannerFilm}
                        resizeMod='stretch'
                    />
                    <View style={styles.textContainer}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={styles.titleEng}>
                            {item.title_english}
                        </Text>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={styles.titleVn}>
                            {item.title_vn}
                        </Text>
                        <View style={{ marginTop: 10, marginLeft: 4, height: 2, width: 200, backgroundColor: item.color, }}>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.lineColor}>
                </View>
            </View>
        )
    }

    renderFlatList() {
        if (this.state.showInput)
            return (
                <View style={{ margin: 20, backgroundColor: 'white', zIndex: 100 }}>
                    <FlatList
                        data={this.state.ds}
                        renderItem={({ item }) => this.renderItemFilm(item)}
                    >
                    </FlatList>
                </View>
            )
        else
            return null;
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <ImageButton
                        onPress={() => this.props.navigation.navigate('DrawerToggle')}
                        source={res.icons.menu}
                        tintColor='white' />
                    <View style={styles.searchContainer}>
                        {this.renderInputSearch()}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ScreenSearchFilm')}>
                            <Image
                                source={res.icons.search}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.renderFlatList()}
            </View>
        )
    }
}