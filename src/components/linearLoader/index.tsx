import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { COLORS } from "utilities";

import LinearProgress from "@material-ui/core/LinearProgress";

interface ILinearLoaderProps {}

const StyledLinearProgress = withStyles({
  root: {
    backgroundColor: COLORS.TITLE_GRAY,
    "& div.MuiLinearProgress-bar": {
      backgroundColor: COLORS.MAIN,
    },
  },
})(LinearProgress);

const LinearLoader: React.SFC<ILinearLoaderProps> = (props) => {
  return <StyledLinearProgress />;
};

export default LinearLoader;
