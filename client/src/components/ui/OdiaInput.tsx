import React from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

type TransliterateInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

const OdiaInput: React.FC<TransliterateInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  return (
    <ReactTransliterate
      renderComponent={(props) => <input {...props} {...rest} />}
      value={value}
      onChangeText={onChange}
      lang={"or"}
    />
  );
};

export default OdiaInput;
