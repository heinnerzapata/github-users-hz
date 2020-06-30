import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datePicker.module.scss";

interface IDatePickerProps {
  value: Date;
  name: string;
  disabled?: boolean;
  onChangeDate: (name: string, val: any) => void;
}

const DatePickerControl: React.SFC<IDatePickerProps> = (props) => {
  return (
    <DatePicker
      className={styles.datePicker}
      selected={props.value}
      popperPlacement={"right-end"}
      disabled={props.disabled}
      onChange={(val: any) => {
        props.onChangeDate(props.name, val);
      }}
    />
  );
};

export default DatePickerControl;
