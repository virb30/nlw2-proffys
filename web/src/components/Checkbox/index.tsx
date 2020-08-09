import React, { InputHTMLAttributes } from "react";

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Checkbox: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="checkbox-block">
      <input type="checkbox" id={name} {...rest} /> {label}
    </div>
  );
};

export default Checkbox;
