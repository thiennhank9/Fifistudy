import React from "react";

export default class HeaderLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="header__item">
                <div className="header__profile">
                    <div className="header__wrap-avatar">
                        <img src="http://placehold.it/50x50" alt="Avatar" className="header__avatar"/>
                    </div>
                    <div className="header__name">
                        Nguyễn Thanh Liêm
                        <div className="menu">
                            <div className="menu__item">Phim theo cấp</div>
                            <div className="menu__item">Phim mới nhất</div>
                            <div className="menu__item">Phim quan tâm nhiều</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo
    }
}

