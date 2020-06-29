import React from "react";
import { makeStyles } from "@material-ui/styles";
import { COLORS } from "utilities";
import Button from "@material-ui/core/Button";

interface IButtonProps {
  disabled?: boolean;
  type?: string;
  onClick: (e: any) => void;
  visualType?: "contained" | "outlined";
  size?: "small" | "medium" | "large";
}

const useStyles = makeStyles({
  root: {
    marginRight: "5px",
    marginLeft: "5px",
    color: (props: any) =>
      props.visualType === "outlined" ? COLORS.WHITE : COLORS.WHITE,
    backgroundColor: (props: any) =>
      props.visualType === "outlined" ? "transparent" : COLORS.MAIN,
    "&:hover": {
      backgroundColor: (props: any) =>
        props.visualType === "outlined" ? "transparent" : COLORS.MAIN,
    },
  },
});

const ButtonControl: React.SFC<IButtonProps> = (props) => {
  const classes = useStyles({
    visualType: props.visualType ? props.visualType : "contained",
  });
  return (
    <Button
      type={props.type === "submit" ? "submit" : "button"}
      className={classes.root}
      disabled={props.disabled}
      onClick={(e) => props.onClick(e)}
      variant={props.visualType ? props.visualType : "contained"}
      size={props.size ? props.size : "medium"}
    >
      {props.children}
    </Button>
  );
};

export default ButtonControl;
