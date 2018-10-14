    import React from 'react';
import QuizzPage from './QuizzPage';
import LoadingPage from '../components/Loading'
    import {getQuizz} from "../actions/api";

    export default class QuizzPageContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:null
        };
    }
    componentWillMount = () =>{
        getQuizz(this.props.match.params.episodeId).then(data=>{
            this.setState({
                data
            });
        })
    }
    render(){
        if (this.state.data==null){
            return <LoadingPage/>
        }
        if (this.state.data.errors==null){
            return  <QuizzPage data={this.state.data.data}/>
        }
        return <LoadingPage/>
    }
}