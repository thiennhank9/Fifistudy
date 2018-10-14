import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {ImageButton} from '../Components/index.js';
import Res from '../Resources/index.js';

export default class EpisodeCommentItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowDescription: false,
        };
    }

    toggleDescription(){
        let isShowDescription = this.state.isShowDescription;
        this.setState({
            isShowDescription: !isShowDescription,
        });
    }

    render(){
        const {data} = this.props;
        return (
            <View style={Styles.container}>
                <View style={{flexDirection: 'row',}}>
                    <View style={Styles.verticalLine}/>

                    {/* <View style={Styles.circle}/> */}
                    <View style={Styles.circleBtnContainer}>
                        <ImageButton size={15}
                            tintColor={this.state.isShowDescription ? Res.colors.gray : Res.colors.blue}
                            source={this.state.isShowDescription ? Res.icons.circle : Res.icons.circleFull}
                            onPress={() => this.toggleDescription()}/>
                    </View>


                    <TouchableOpacity style={Styles.content}
                        onPress={() => this.props.navigation.navigate('ScreenListFilm', {title: data.name})}>
                        <Text style={Styles.title}>{data.name}</Text>
                        {this.state.isShowDescription && <Text style={Styles.description}>{data.description}</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
    },
    verticalLine: {
        width: 1,
        left: 6,
        backgroundColor: Res.colors.line,
    },
    circle: {
        width: 13,
        height: 13,
        backgroundColor: Res.colors.blue,
        borderRadius: 8,
        marginTop: 36,
        elevation: 3,
        position: 'absolute'
    },
    circleBtnContainer: {
        marginTop: 25,
        left: -11,
        position: 'absolute'
    },
    content: {
        marginLeft: 30,
        marginTop: 30
    },
    title: {
        fontSize: 16,
        opacity: 0.9
    },
    description: {
        marginTop: 4,
        color: Res.colors.gray,
        opacity: 0.8,
        width: Dimensions.get('window').width - 86
    }


});