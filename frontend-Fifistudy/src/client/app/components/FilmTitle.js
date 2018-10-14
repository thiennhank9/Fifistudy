import React from "react";

function FilmTitle({enName, viName}) {
    return (
        <div className="film-title">
            <div className="film-title__en-name">
                {
                    enName
                }
            </div>
            <div
                className="film-title__vi-name">
                {
                    viName
                }
            </div>
        </div>
    )
}
export default FilmTitle