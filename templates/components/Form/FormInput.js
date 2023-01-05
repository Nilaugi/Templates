import React, { useState } from "react";

const FormInput = ({
  icon,
  id,
  myRef,
  handleChange,
  setState,
  state,
  ariaDescribedby,
  title,
  mb,
  maxLength,
  type,
}) => {
  const [focus, setFocus] = useState(false);
  const [inputType, setInputType] =
    useState(type);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  return (
    <label
      className={`form-input-container${
        focus ? " form-input-focus" : ""
      }${
        state.length ? " form-input-filled" : ""
      }${mb ? " form-input-mb" : ""}`}
    >
      <span className="form-input-icon">
        {icon}
      </span>
      <input
        id={id}
        ref={myRef}
        onChange={(e) =>
          handleChange(e, setState)
        }
        value={state}
        type={inputType}
        className="form-input-control"
        aria-describedby={ariaDescribedby}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
      />
      <span className="form-input-title">
        {title}
      </span>
    </label>
  );
};

export default FormInput;
