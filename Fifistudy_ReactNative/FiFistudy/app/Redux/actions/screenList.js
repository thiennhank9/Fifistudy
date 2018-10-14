import * as Types from "../const/screenList";
import * as ApiAction from "../../Server/ApiAction";

// export const getFilmByDifficultLevel = (difficultLevel)=>{
//     return (dispatch)=>{
//         ApiAction.getFilmByDifficultLevel(difficultLevel).then(response=>{
//             dispatch({
//                 type:Types.GET_FILM_BY_DIFFICULT_LEVEL,
//                 data:response
//             })
//         })
//     }
// }

export const getFilmByDifficultLevel = (difficultLevel) => {
    return (dispatch) => {
        dispatch({
            type: Types.GET_FILM_BY_DIFFICULT_LEVEL,
            data: null,
            isLoading:true
        })
        ApiAction.getFilmByDifficultLevel(difficultLevel).then(response => {
            dispatch({
                type: Types.GET_FILM_BY_DIFFICULT_LEVEL,
                data: response,
                isLoading:false
            })
        })
    }
}

export const resetFilmByDifficultLevel = () => {
    return (dispatch) => {
        dispatch({
            type: Types.RESET_FILM_BY_DIFFICULT_LEVEL
        })
    }
}

export const getSearch = (searchKey,orderBy,pageNumber,pageSize) =>{

    return (dispatch)=>{
        dispatch({
            type:Types.GET_SEARCH,
            data:null,
            isLoading:true
        })
        ApiAction.getSearch(searchKey,orderBy,pageNumber,pageSize).then(response=>{
            dispatch({
                type:Types.GET_SEARCH,
                data:response,
                isLoading:false
            })
        })
    }
}