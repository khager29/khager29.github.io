import { ChangeEventHandler } from "react";

type EnabledCheckboxProps = {
  className: string;
  numButtons: number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
const EnabledCheckbox = ({
  className,
  numButtons,
  handleChange,
}: EnabledCheckboxProps) => {
  const emptyArray = Array(numButtons).fill(0);
  const buttonSet = emptyArray.map((_item, index) => (
    <label
      className={className}
      htmlFor={`enabledBox${index + 1}`}
      key={`enabledLabel${index + 1}`}
    >
      {`Button ${index + 1} Enabled?`}
      <input
        id={`enabledBox${index + 1}`}
        key={`enabledCheck${index + 1}`}
        type="checkbox"
        onChange={handleChange}
      />
    </label>
  ));
  return <div className="row">{buttonSet}</div>;
};

export default EnabledCheckbox;
