import * as Types from '../const/screenMovie';
import * as ApiAction from '../../Server/ApiAction'

export const getFilm = (filmSlug)=>{
    return (dispatch)=>{
        ApiAction.getFilm(filmSlug).then(response=>{
            dispatch({
                type:Types.GET_FILM,
                data:response
            })
        })
    }
}