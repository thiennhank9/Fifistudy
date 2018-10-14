import Level from "./Level.jsx";
import React from "react";
import {Link} from "react-router-dom";
import {serverDomain} from "../config/server";

function BannerItem({data}) {
    let filmDetail = data.film_detail
    return (
        <Link to={`/film/${filmDetail.slug}`} className="banner-item">
            <img className="banner-item__img" src={serverDomain + filmDetail.thumbnail} alt=""/>
            <div className="banner-item__info">
                <div className="banner-item__eng-title">
                    {
                        filmDetail.english_name
                    }
                </div>
                <div className="banner-item__vi-title">
                    {
                        filmDetail.vietnamese_name
                    }
                </div>
                <div className="banner-item__quote">
                    {
                        `"${data.quote}"`
                    }
                </div>
                <div className="banner-item__level">
                    {
                        <Level level={filmDetail.difficult_level}/>
                    }
                </div>
            </div>
        </Link>
    )
}
export default BannerItem;