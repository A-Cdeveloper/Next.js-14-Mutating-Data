"use client";
import { useFormStatus } from "react-dom";
const FormSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {!pending ? <button type="reset">Reset</button> : null}
      <button>{pending ? "Submiting data..." : "Create Post"}</button>
    </>
  );
};

export default FormSubmitButton;
