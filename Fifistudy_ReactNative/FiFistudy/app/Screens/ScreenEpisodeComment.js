// screen comment in watch screen
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { ImageButton, } from '../Components/index.js';
import {EpisodeCommentContainer} from '../Containers/index.js';
import Resources from '../Resources/index.js';
import Styles from '../Styles/ScreenEpisodeComment.js';

export default class ScreenComment extends Component {
    render() {
        return (
            <View style={Styles.commentContainer}>
                {/* Title section */}
                <View style={Styles.toolbarContainer}>
                    <ImageButton source={Resources.icons.close} tintColor={Resources.colors.blue}
                            // onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                            onPress={() => this.props.navigation.navigate('ScreenWatchMovie')}/>

                    <Text style={Styles.title}>
                        Bình luận</Text>
                </View>




                {/* Enter comment section */}
                <View style={Styles.enterCommentContainer}>
                    <TextInput style={Styles.textInput}
                        autoGrow={true}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        multiline={true}
                        blurOnSubmit={false}/>
                    <View style={Styles.btnSend}>
                        <ImageButton source={Resources.icons.send} tintColor='white'/>
                    </View>
                </View>
                <View style={[Styles.line, {opacity: 0.5, elevation: 3}]}/>
                
                <EpisodeCommentContainer/>
            </View>
        );
    }
}