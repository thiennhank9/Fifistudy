import classNames from "classnames";
import React from "react";


function Level({level}) {
    function renderLevel() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            if (i < level) {
                arr.push(
                    <div key={i} className={classNames(`level__item level__item--${level}`)}/>
                )
            }
            else {
                arr.push(
                    <div key={i} className="level__item"/>
                )
            }
        }
        return arr;
    };
    return (
        <div className="level">
            {
                renderLevel()
            }


        </div>
    )
}
export default Level