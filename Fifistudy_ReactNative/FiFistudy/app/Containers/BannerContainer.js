import React, { Component } from 'react';
import { getPromotes } from '../Redux/actions/screenHome'
import {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {Banner} from '../Components/index'

class BannerContainer extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount = () =>{
        // this.props.getPromotes();
    }
    render(){
        if (this.props.promotes.isLoading==true){
            return (
                <View>
                    <Text>

                        Dang tai
                    </Text>
                </View>
            )
        }
        if (this.props.promotes.data==null){
            return (
                <View>
                    <Text>

                        Loi
                    </Text>
                </View>
            )

        }
        if (this.props.promotes.data.errors!=null){
            return (
                <View>
                    <Text>

                        Loi
                    </Text>
                </View>
            )
        }
        return (
           <Banner data={this.props.promotes.data.data}/>
        )
    }

}


const mapStateToProps = state => {
    return {
        promotes: state.screenHome.promotes
    }
}

export default connect(mapStateToProps)(BannerContainer)