import React, { useReducer, useEffect } from "react";

import { validate } from "../../Util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  let element;
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === "textarea") {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === "select") {
    element = (
      <select
        id={props.id}
        name={props.name}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        <option value="">Select a category</option>
        {props.options.map((option) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </select>
    );
  }

  return (
    <div
      className={`control ${
        !inputState.isValid && inputState.isTouched && "control--invalid"
      }`}
    >
      <label className="label" htmlFor={props.id}>
        {props.label}
      </label>
      <br />
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
