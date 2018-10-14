import React from "react";
import {Cookies, withCookies} from "react-cookie";
import {postSignUpOne, postSignUpTwo, postUpdateAvatar, postUpdateUserInfo} from "../actions/api";
import Input from "../components/Input";
import update from "react-addons-update";
import {instanceOf} from "prop-types";
import validator from "validator";
import {connect} from "react-redux";
import {doLogin, getUserInfo} from "../actions/app";
import "react-datepicker/dist/react-datepicker.css";
import FadeTransition from "../components/FadeTransition";
import {SERVER_ERRORS} from "../constants/serverErrors";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
require('imports-loader?$=jquery!../../static/js/jquery.easing.1.3.js');


class SignUp extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    componentWillUnmount = () => {
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            pin: '',
            firstName: '',
            lastName: '',
            sex: 1,
            phone: '',
            birthday: moment(),
            address: '',
            disableNextOne: true,
            errors: {},
            serverErrors: [],
            disableNextTwo: true,
            disableNextThree: true,
            avatarFile: null,
            disableNextFour: true,
            token: ''
        };

    }

    onChangeTextInput = (evt) => {
        let errors = this.state.errors;
        delete errors[evt.target.name];
        let newErrors = update(this.state.errors, {$set: errors})
        this.setState({
            errors: newErrors,
            [evt.target.name]: evt.target.value,
            serverErrors: []
        });
        let objToCheck = update(this.state, {$merge: {[evt.target.name]: evt.target.value}})
        if (!validator.isEmpty(objToCheck.username) && !validator.isEmpty(objToCheck.password) && !validator.isEmpty(objToCheck.confirmPass) && validator.isEmail(objToCheck.email)) {
            this.setState({
                disableNextOne: false
            })
        }
        else {
            this.setState({
                disableNextOne: true
            })
        }
        if (!validator.isEmpty(objToCheck.pin)) {
            this.setState({
                disableNextTwo: false
            })
        }
        else {
            this.setState({
                disableNextTwo: true
            })
        }
        if (!validator.isEmpty(objToCheck.firstName) && !validator.isEmpty(objToCheck.lastName) && validator.isNumeric(objToCheck.phone) && !validator.isEmpty(objToCheck.address)) {
            this.setState({
                disableNextThree: false
            })
        }
        else {
            this.setState({
                disableNextThree: true
            })
        }
    }

    onBlurTextInput = (evt) => {
        switch (evt.target.name) {
            case "password":
            case "username":
            case "confirmPass":
            case "pin":
                if (validator.isEmpty(this.state[evt.target.name])) {
                    let errors = update(this.state.errors, {$merge: {[evt.target.name]: "Không được để trống"}});
                    this.setState({
                        errors
                    })
                }

                let value = evt.target.value;
                if (evt.target.name == "confirmPass") {
                    if (!validator.equals(this.state.password, value)) {
                        // console.log(value)
                        let errors = update(this.state.errors, {$merge: {confirmPass: "Xác nhận mật khẩu không khớp"}});
                        this.setState({
                            errors
                        })
                    }
                }
                break;
            case "email":
                if (!validator.isEmail(this.state[evt.target.name])) {
                    let errors = update(this.state.errors, {$merge: {[evt.target.name]: "Vui lòng nhập đúng định dạng email"}});
                    this.setState({
                        errors
                    })
                }
                ;
                break;
            case "phone":
                if (!validator.isNumeric(this.state[evt.target.name])) {
                    let errors = update(this.state.errors, {$merge: {[evt.target.name]: "Số điện thoại ko hợp lệ"}});
                    this.setState({
                        errors
                    })
                }
                ;
                break;
        }
    }

    animateNext = (el) => {
        var current_fs, next_fs, previous_fs; //fieldsets
        var left, opacity, scale; //fieldset properties which we will animate
        var animating; //flag to prevent quick multi-click glitches
        // if (animating) return false;
        // if (disable) return false;
        animating = true;

        current_fs = $(el).parent();
        next_fs = $(el).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'position': 'absolute',
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }


    onRadioButtonChange = (event) => {
        this.setState({
            sex: event.target.name
        })
    }

    onClickStepOne = (event) => {
        let data = {
            "username": this.state.username,
            "confirm_password": this.state.confirmPass,
            "password": this.state.password,
            "email": this.state.email,
        };
        const el = event.target;
        const {cookies} = this.props;
        postSignUpOne(data).then(res => {

            // Loi validate, logic
            if (res.data.errors) {
                let errors = res.data.errors.map(item => {
                    return SERVER_ERRORS[item.errorCode]
                });
                this.setState({
                    serverErrors: errors,
                    disableNextOne: true
                })
            }
            else {
                // Thanh cong
                this.setState({
                    disableNextOne: false,
                    serverErrors: [],
                    token: res.data.data.token,
                })
                this.animateNext(el);

                // cookies.set("token", res.data.data.token);
            }

        })
    }


    onClickStepTwo = (evt) => {

        let {cookies} = this.props;
        let data = {
            pin: this.state.pin
        }
        let headers = {headers: {Authorization: `Token ${this.state.token}`}}
        let el = evt.target;
        let token = this.state.token;
        postSignUpTwo(data, headers)
            .then(res => {

                // Loi validate, logic
                if (res.data.errors) {
                    let errors = res.data.errors.map(item => {
                        return SERVER_ERRORS[item.errorCode]
                    });
                    this.setState({
                        serverErrors: errors,
                        disableNextTwo: true
                    })
                }
                else {
                    // Thanh cong
                    this.setState({
                        disableNextTwo: false,
                        serverErrors: [],
                    })
                    this.animateNext(el);
                    cookies.set("token", token);
                }


            })
    }

    onClickStepThree = (evt) => {
        let {cookies} = this.props;
        let birthday = `${this.state.birthday.year()}-${this.state.birthday.month() + 1}-${this.state.birthday.date()}`;
        let data =
            {
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "gender": parseInt(this.state.sex),
                "phone": this.state.phone,
                "birthday": birthday,
                "address": this.state.address
            }
        let el = evt.target;
        let headers = {headers: {Authorization: `Token ${cookies.get("token")}`}}
        postUpdateUserInfo(data, headers)
            .then(res => {
                if (res.data.errors) {
                    let errors = res.data.errors.map(item => {
                        return SERVER_ERRORS[item.errorCode]
                    });
                    this.setState({
                        serverErrors: errors,
                        disableNextThree: true,
                    })
                }
                else {
                    // Thanh cong
                    this.setState({
                        disableNextThree: false,
                        serverErrors: [],
                    })
                    this.animateNext(el);
                }
            })
    }

    onClickCancelButton = (evt) => {
        let el = evt.target;
        this.animateNext(el);
    }

    animatePrev = (el) => {
        var current_fs, next_fs, previous_fs; //fieldsets
        var left, opacity, scale; //fieldset properties which we will animate
        var animating; //flag to prevent quick multi-click glitches
        // if (animating) return false;
        // if (disable) return false;
        animating = true;
        animating = true;

        current_fs = $(el).parent();
        previous_fs = $(el).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //el comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }

    onOpenAvatar = (e) => {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        this.setState({
            avatarFile: file,
            disableNextFour: false
        })
        // var reader = new FileReader();
        // reader.onload = function(e) {
        //     var contents = e.target.result;
        //     displayContents(contents);
        // };
        // reader.readAsText(file);
    }

    onClickBackButton = (evt) => {
        let el = evt.target;
        this.animatePrev(el);
    }

    onClickUploadAvatarButton = (evt) => {
        let {cookies} = this.props;
        let data = new FormData();
        data.append("avatar", this.state.avatarFile);
        let el = evt.target;
        let headers = {headers: {Authorization: `Token ${cookies.get("token")}`}}
        postUpdateAvatar(data, headers)
            .then(res => {
                if (res.data.errors) {
                    let errors = res.data.errors.map(item => {
                        return SERVER_ERRORS[item.errorCode]
                    });
                    this.setState({
                        serverErrors: errors,
                        disableNextFour: true,
                    })
                }
                else {
                    // Thanh cong
                    this.setState({
                        disableNextFour: false,
                        serverErrors: [],
                    })
                    this.animateNext(el);
                }
            })
    }

    renderServerErrors = () => {
        return this.state.serverErrors.map(item => {
            return (
                <div className="sign-up-page__error">
                    {
                        item
                    }
                </div>
            )
        })
    }

    handleChange = (value) => {
        this.setState({
                birthday: value
            }
        );
    }

    onClickDone = () => {
        const {cookies} = this.props;
        if (cookies.get("token")) {
            this.props.getUserInfo(cookies.get("token"));
            this.props.doLogin(true);
        }
    }

    render() {
        return (
            <FadeTransition>
                <div className="sign-up-page">
                    <div className="sign-up-page__overlay"></div>
                    <form id="msform">
                        <ul id="progressbar">
                            <li className="active">Tạo tài khoản</li>
                            <li>Xác nhận tài khoản</li>
                            <li>Nhập thông tin tài khoản</li>
                            <li>Upload avatar</li>
                            <li>Hoàn thành</li>
                        </ul>
                        <fieldset>
                            <h2 className="fs-title">Tạo tài khoản</h2>
                            <h3 className="fs-subtitle">Nhập thông tin tài khoản</h3>
                            {/*<input onBlur={this.onBlurTextInput} type="text" onChange={this.onChangeTextInput}*/}
                            {/*name="username" placeholder="Tên tài khoản"*/}
                            {/*value={this.state.username}/>*/}
                            <Input onBlur={this.onBlurTextInput} type="text" onChange={this.onChangeTextInput}
                                   name="username" placeholder="Tên tài khoản"
                                   value={this.state.username} err={this.state.errors.username}/>
                            <Input onBlur={this.onBlurTextInput} type="text" onChange={this.onChangeTextInput}
                                   name="email"
                                   placeholder="Email"
                                   value={this.state.email} err={this.state.errors.email}/>

                            <Input onBlur={this.onBlurTextInput} type="password" onChange={this.onChangeTextInput}
                                   name="password" placeholder="Mật khẩu"
                                   value={this.state.password} err={this.state.errors.password}/>

                            <Input onBlur={this.onBlurTextInput} type="password" onChange={this.onChangeTextInput}
                                   name="confirmPass"
                                   placeholder="Xác nhận mật khẩu" value={this.state.confirmPass}
                                   err={this.state.errors.confirmPass}/>
                            <div className="signup__error">

                                {
                                    this.renderServerErrors()
                                }
                            </div>
                            <button disabled={this.state.disableNextOne} onClick={this.onClickStepOne} type="button"
                                    name="next" className="next action-button"
                            >
                                Tiếp theo
                            </button>
                        </fieldset>
                        <fieldset>
                            <h2 className="fs-title">Xác nhận tài khoản</h2>
                            <h3 className="fs-subtitle">Nhập mã xác nhận</h3>
                            <Input type="text" onChange={this.onChangeTextInput} name="pin" placeholder="Mã xác nhận"
                                   value={this.state.pin} error={this.state.errors.pin}/>
                            {
                                this.renderServerErrors()
                            }
                            <button disabled={this.state.disableNextTwo} onClick={this.onClickStepTwo}
                                    type="button"
                                    name="next" className="next action-button"
                            >
                                Tiếp theo
                            </button>
                        </fieldset>
                        <fieldset>
                            <h2 className="fs-title">Nhập thông tin tài khoản</h2>
                            <h3 className="fs-subtitle">Thêm thông tin cá nhân</h3>
                            <Input type="text" onChange={this.onChangeTextInput} name="firstName"
                                   placeholder="Họ và tên lót" value={this.state.firstName}/>
                            <Input type="text" onChange={this.onChangeTextInput} name="lastName" placeholder="Tên"
                                   value={this.state.lastName}/>
                            <div className="wrap-input">
                                <div className="wrap-input__title">Giới tính</div>
                                <label className="label--radio">
                                    <input type="radio" className="radio" onChange={this.onRadioButtonChange}
                                           checked={this.state.sex == 1} name={1}/>
                                    Nam
                                </label>
                                <label className="label--radio">
                                    <input type="radio" className="radio" onChange={this.onRadioButtonChange}
                                           checked={this.state.sex == 0} name={0}/>
                                    Nữ
                                </label>
                            </div>
                            <Input type="text" onChange={this.onChangeTextInput} name="phone"
                                   placeholder="Số điện thoại" err={this.state.errors.phone}
                                   value={this.state.phone}/>
                            <DatePicker
                                className="input-com__input"
                                selected={this.state.birthday}
                                onChange={this.handleChange}
                                dateFormat="DD-MM-YYYY"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                            {/*<Input type="text" onChange={this.onChangeTextInput} name="birthday" placeholder="Ngày sinh"*/}
                            {/*value={this.state.birthday}/>*/}
                            <textarea className="input-com__input" onChange={this.onChangeTextInput} type="text"
                                      name="address" placeholder="Địa chỉ"
                                      value={this.state.address}/>
                            {
                                this.renderServerErrors()
                            }
                            <button onClick={this.onClickCancelButton} type="button"
                                    name="next" className="next action-button action-button__cancel"
                            >
                                Bỏ qua
                            </button>
                            <button disabled={this.state.disableNextThree} onClick={this.onClickStepThree} type="button"
                                    name="next" className="next action-button"
                            >
                                Tiếp theo
                            </button>
                        </fieldset>
                        <fieldset>
                            <h2 className="fs-title">Cập nhật ảnh đại diện</h2>
                            <h3 className="fs-subtitle">Thêm ảnh đại diện</h3>
                            <div className="wrap-input wrap-input--center">
                                <label htmlFor="avatar" className="action-button">
                                    Upload Avatar
                                </label>
                            </div>

                            {
                                this.state.avatarFile ?
                                    <div>{this.state.avatarFile.name}</div> : null
                            }


                            <input onChange={this.onOpenAvatar} id="avatar" type="file" hidden={true}/>

                            <button onClick={this.onClickBackButton} type="button"
                                    name="next" className="next action-button"
                            >
                                Trở lại
                            </button>
                            <button onClick={this.onClickCancelButton} type="button"
                                    name="next" className="next action-button action-button__cancel"
                            >
                                Bỏ qua
                            </button>
                            <button disabled={this.state.disableNextFour} onClick={this.onClickUploadAvatarButton}
                                    type="button"
                                    name="next" className="next action-button "
                            >
                                Xong
                            </button>
                        </fieldset>
                        <fieldset>
                            <h2 className="fs-title">Hoàn thành</h2>
                            <Link onClick={this.onClickDone} to="/" className="next action-button "
                            >
                                OK
                            </Link>
                        </fieldset>
                    </form>
                </div>
            </FadeTransition>
        )
    }
}

export default withCookies(connect(null, {getUserInfo, doLogin})(SignUp))