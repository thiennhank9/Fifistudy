import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import classNames from "classnames";

class Episode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderEpisode = () => {
        let {data} = this.props;
        let arr = data.episodes.map(item => {
            return item.number
        })
        arr.sort((a, b) => a > b);
        return arr.map(item => {
            return (

                <Link to={`/film/${data.slug}/${item}`}
                      className={classNames("episode__item", {"episode__item--current": item == this.props.match.params.episodeId})}>
                    {item}
                </Link>
            )

        })
    }

    render() {
        return (


            <div className="episode">
                <div className="container">
                    <div className="episode__wrap ">
                        <div className="episode__title">
                            CÁC TẬP PHIM
                        </div>
                        <div className="episode__content">

                            {
                                this.renderEpisode()
                            }
                        </div>
                    </div>

                    <div className="divider"></div>
                </div>
            </div>
        )
    }
}
export default withRouter(Episode)