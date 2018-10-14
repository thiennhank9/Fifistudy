import React from "react";
import classNames from "classnames";
import onClickOutside from "react-onclickoutside";
import {Link} from "react-router-dom";

class Logo extends React.Component {
    handleClickOutside = evt => {
        this.props.closeMenu();
    }
    onClickMenuItem = (item) => {
        if (item.onClick) {
            item.onClick();
        }
    }

    renderMenu = () => {
        return this.props.data.map(item => {
            if (item.link) {
                return (
                    <Link className="menu__item" to={item.link}>
                        {item.name}
                    </Link>
                )
            }
            else {
                return (
                    <div onClick={this.onClickMenuItem.bind(this, item)} className="menu__item">
                        {item.name}
                    </div>

                )
            }
        })
    }

    render() {
        return (
            <div className={classNames("menu", {"menu--open": this.props.isOpen})}>
                {
                    this.renderMenu()
                }
            </div>
        )
    }
}
export default onClickOutside(Logo)