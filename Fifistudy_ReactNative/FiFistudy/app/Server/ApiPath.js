export const API_PATH = {
    getPromote: `/api/promotes/get_all/`,
    // getPromote: `/search/movie?api_key=9e6a1314bf676a83bdabc4938078e5d6&query=batman`,
    getLastest: `/api/films/get_all_order_by_updated/`,
    getLastestWithAuth: `/api/films/get_all_order_by_updated_with_auth/`,
    // get
    getMostView: `/api/films/get_all_order_by_view/`,
    getMostViewWithAuth: `/api/films/get_all_order_by_view_with_auth/`,

    getFilm: (slug) => {
        return `/api/films/detail/slug/?film_slug=${slug}`
    },
    getEpisode: (filmSlug, episodeId) => {
        return `/api/episodes/detail/?film_slug=${filmSlug}&episode_number=${episodeId}`
    },
    getActor: (slug) => `/api/actor/film/?film_slug=${slug}`,
    getSearch: (searchKey, orderBy, pageNumber, pageSize = MAX_PAGE) => `/api/films/search_film_by_key/?search_key=${searchKey}&order_by=${orderBy}&page_size=${pageSize}&page=${pageNumber}`,
    postSignUpOne: `/api/signup/signup_step_one/`,
    postSignUpTwo: `/api/signup/active_user/`,
    postUpdateUserInfo: `/api/signup/signup_step_two/`,
    postUpdateAvatar: `/api/signup/update_avatar/`,
    getUserInfo: `/api/fifi_user/get_current/`,
    postLogin: `/api/auth/login/`,
    getLogout: `/api/auth/logout/`,
    postUserSaveFilm: `/api/films/save_film/`,
    getUserSaveFilm: `/api/films/save_film/`,
    postComment: `/api/comments/save_comment/`,

    getComment: (slug) => {
        return `/api/comments/film/?film_slug=${slug}`
    },
    getCommentWithAuth: (slug) => {
        return `/api/comments/film_with_auth/?film_slug=${slug}`
    },
    postLikeComment: `/api/comments/like_comment/`,
    getFilmByDifficult: (difficultLevel) => `/api/films/get_list_by_difficult_level/${difficultLevel}`,
    postSaveVocabulary: `/api/vocabularies/save_vocabulary/`,
    getVocabulary: `/api/vocabularies/list_vocabulary/`,
    deleteVocabulary: (vocabularyId) => `/api/vocabularies/delete_vocabulary/${vocabularyId}/`
}

// slug/?film_slug=<slug></slug>