import React, { useState } from "react";

const FormTextarea = ({
  id,
  myRef,
  handleChange,
  setState,
  state,
  ariaDescribedby,
  title,
  maxLength,
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  return (
    <label
      className={`form-input-container form-input-textarea${
        focus ? " form-input-focus" : ""
      }${
        state.length ? " form-input-filled" : ""
      }`}
    >
      <textarea
        id={id}
        ref={myRef}
        onChange={(e) =>
          handleChange(e, setState)
        }
        value={state}
        className="form-input-control"
        aria-describedby={ariaDescribedby}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={4}
        maxLength={maxLength}
      />
      <span className="form-input-title">
        {title}
      </span>
    </label>
  );
};

export default FormTextarea;
