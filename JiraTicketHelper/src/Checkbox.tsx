import { ChangeEventHandler } from "react";

type CheckboxProps = {
  className: string;
  labelName: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
const Checkbox = ({ className, labelName, handleChange }: CheckboxProps) => {
  return (
    <label
      className={className}
      htmlFor={`${labelName}Checkbox`}
      key={`${labelName}Checkbox`}
    >
      {labelName}
      <input
        id={`${labelName}Checkbox`}
        key={`${labelName}Checkbox`}
        type="checkbox"
        onChange={handleChange}
      />
    </label>
  );
};

export default Checkbox;
