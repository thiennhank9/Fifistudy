import React from "react";
import classNames from "classnames";

export default function ({placeholder, label, type, name, value, err, onBlur, onChange, disabled}) {
    return (
        <div className="user-input">

            <label className="user-input__label" htmlFor={name}>{label}</label>
            <input disabled={disabled || false} id={label}
                   className={classNames("user-input__input", {"input-input__input--error": !!err})}
                   onBlur={ (evt) => {
                       if (onBlur) {
                           onBlur(evt);
                       }
                   }
                   }
                   type={type} onChange={(evt) => {
                if (onChange) {
                    onChange(evt);
                }
            }}
                   name={name} placeholder={placeholder}
                   value={value}/>
            {
                err ?
                    <div className="input-com__error">{err}</div> : null
            }
        </div>

    )
}