import * as Types from '../const/screenHome';
import * as ApiAction from '../../Server/ApiAction'

export const getPromotes = ()=>{
    return (dispatch)=>{
       ApiAction.getPromotes().then(response=>{
           dispatch({
               type:Types.GET_PROMOTE,
               data:response
           })
       })
    }
}

export const getLastest = ()=>{
    return (dispatch)=>{
        ApiAction.getLastest().then(response=>{
            dispatch({
                type:Types.GET_LASTEST,
                data:response
            })
        })
    }
}

export const getMostView = ()=>{
    return (dispatch)=>{
        ApiAction.getMostView().then(response=>{
            dispatch({
                type:Types.GET_MOST_VIEW,
                data:response
            })
        })
    }
}