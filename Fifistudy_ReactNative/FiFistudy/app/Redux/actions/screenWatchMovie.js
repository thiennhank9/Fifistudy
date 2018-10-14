import * as Types from '../const/screenWatchMovie';
import * as ApiAction from '../../Server/ApiAction'

export const getEpisode = (filmSlug,episodeId)=>{
    return (dispatch)=>{
        dispatch({
            type:Types.GET_EPISODE,
            data:null,
            isLoading:true
        })
        ApiAction.getEpisode(filmSlug,episodeId).then(response=>{
            dispatch({
                type:Types.GET_EPISODE,
                data:response,
                isLoading:false
            })
        })
    }
}