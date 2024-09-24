import { ChangeEventHandler } from "react";

type InputProps = {
  className: string;
  labelName: string;
  value: string | number | readonly string[] | undefined;
  type: string;
  min?: number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
const Input = ({
  className,
  labelName,
  min,
  type,
  value,
  handleChange,
}: InputProps) => {
  return (
    <label className={className}>
      {labelName}
      <input min={min} type={type} value={value} onChange={handleChange} />
    </label>
  );
};

export default Input;
