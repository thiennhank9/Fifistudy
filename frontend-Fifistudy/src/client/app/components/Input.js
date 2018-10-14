import React from "react";
import classNames from "classnames";

export default function ({placeholder, type, label, name, value, err, onBlur, onChange}) {
    return (
        <div className="input-com">
            <input className={classNames("input-com__input", {"input-com__input--error": !!err})} onBlur={ (evt) => {
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