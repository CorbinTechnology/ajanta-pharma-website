import { FC, SetStateAction, useState } from "react";
import "./style.css";

interface InputFieldProps {
  readOnly?: boolean;
}

const InputField: FC<InputFieldProps> = ({readOnly = false}) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      setInputValue(event.target.value);
    };
  return <div>
    <input
    className="input-field"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder=""
        readOnly= {readOnly}
      />
  </div>;
};

export default InputField;
