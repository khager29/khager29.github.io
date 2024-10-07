import { ChangeEventHandler } from "react";

type DropdownOptionsProps = {
    className: string;
    numberDropdowns: number;
    handleChange: ChangeEventHandler<HTMLInputElement>;
};
const DropdownOptions = ({
    numberDropdowns,
    className,
    handleChange,
}: DropdownOptionsProps) => {
    const emptyArray = Array(numberDropdowns).fill(0);
    const dropDownOptions = emptyArray.map((_item, index) => (
        <label
            className={className}
            htmlFor={`enabledBox${index + 1}`}
            key={`enabledLabel${index + 1}`}>
            {`Number of options for Dropdown ${index + 1}?`}
            <input
                id={`optionNumInput${index + 1}`}
                key={`optionNum${index + 1}`}
                type="number"
                onChange={handleChange}
            />
        </label>
    ));
    return <div>{dropDownOptions}</div>;
};

export default DropdownOptions;
