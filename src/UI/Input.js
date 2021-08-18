import React from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const classVal = props.error ? `${classes["input"]} ${classes.error}` : `${classes["input"]}`;
    const fileInputType = props.type === "file" ? `${classes.hide}` : null;
    const fileInputError =
      props.type === "file"
        ? `${classes.errorMessage} ${classes.center}`
        : `${classes.errorMessage}`;
    return (
      <div className={classes["form-control"]}>
        <label htmlFor={props.id} className={props.labelClasses}>
          {props.name}
          {props.type !== "file" && ":"}
          {props.type === "file" && <p className={classes.center}>Choose your profile picture</p>}
        </label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.id}
          id={props.id}
          ref={ref}
          className={`${classVal} ${fileInputType}`}
          onBlur={props.onBlur}
        />
        {props.error && (
          <p className={fileInputError}>{props.errorMessage}</p>
        )}
      </div>
    );
}
)

export default Input;
