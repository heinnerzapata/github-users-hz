import { GitHubUser } from "containers";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { IAppState } from "store";
import { ThunkDispatch } from "redux-thunk";
import { setUserInfo } from "store/user/actions";
import { IGitHubUser } from "models";

const mapStateToProps = (state: IAppState) => ({
  userInfo: state.userReducer.userInfo as IGitHubUser,
});
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    setUserInfo: (userInfo: IGitHubUser) => dispatch(setUserInfo(userInfo)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(GitHubUser));
