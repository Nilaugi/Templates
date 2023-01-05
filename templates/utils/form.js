export const handleChange = (e, setter) =>
  setter(e.target.value);

export const addErrorClass = (ref) => {
  if (!ref.parentElement) return;
  ref.parentElement.classList.add(
    "form-input-error",
  );
};
