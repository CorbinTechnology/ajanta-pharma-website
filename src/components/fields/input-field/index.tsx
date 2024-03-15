import { FC, ChangeEvent, useEffect } from "react";
import "./style.css";

interface InputFieldProps {
  moduleName: string[];
  onChange: (newModuleName: string[]) => void;
}

const InputField: FC<InputFieldProps> = ({ moduleName, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange([newValue]);
    };

    return (
      <div className="module-input-name">
       
        <input
          className="input-field"
          type="text"
          value={moduleName?.length > 0 ? moduleName[0] : ''} 
          onChange={handleChange}
          placeholder=""
        />
      </div>
    );
};

export default InputField;
