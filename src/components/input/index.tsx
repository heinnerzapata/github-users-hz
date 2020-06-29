import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { COLORS } from "utilities";

interface IInputProps {
  id: string;
  name: string;
  error?: boolean;
  default?: string;
  value?: string;
  label: string;
  disabled?: boolean;
  type: string;
  errorText: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const StyledInput = withStyles({
  root: {
    width: "100%",
    marginBottom: "8px",
    minHeight: "78px",
    "& label.Mui-focused": {
      color: `${COLORS.MAIN}`,
    },
    "& label": {
      color: `${COLORS.TITLE_GRAY}`,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: `${COLORS.MAIN}`,
    },
    "& .MuiFilledInput-underline.Mui-error:after": {
      borderBottomColor: `${COLORS.ERROR}`,
    },
    "& input.Mui-focused:after": {
      color: `${COLORS.TITLE_GRAY}`,
    },
    "& .MuiInputBase-input": {
      color: `${COLORS.WHITE}`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.TITLE_GRAY}`,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.MAIN}`,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${COLORS.TITLE_GRAY}`,
      },
    },
  },
})(TextField);

const Input: React.SFC<IInputProps> = (props) => {
  return (
    <StyledInput
      id={props.id}
      disabled={props.disabled}
      name={props.name}
      error={props.error}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value || ""}
      label={props.label}
      defaultValue={props.default}
      helperText={props.errorText}
      variant="outlined"
      type={props.type}
    />
  );
};

export default Input;
