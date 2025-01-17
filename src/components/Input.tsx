import { ErrorMessage, Field } from "formik";

interface InputProps {
  label: string;
  name: string;
  type: string;
}
const Input = ({ name, type, label }: InputProps) => (
  <div className="flex flex-col gap-y-1  w-full">
    <label className="text-bodyText text-[1.1rem]" htmlFor={name}>
      {label}
    </label>
    <Field
      className="py-2 bg-white w-full rounded-xl px-3 outline-accentGold"
      name={name}
      type={type}
      id={name}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    <ErrorMessage name={name} component="p" className="text-warmRed " />
  </div>
);

export default Input;
