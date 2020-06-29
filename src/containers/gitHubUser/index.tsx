import React from "react";
import { ModalForm, UserInfo } from "components";
import { Cookies } from "react-cookie";
import { IGitHubUser } from "models";

interface IGitHubUserProps {
  cookies: Cookies;
}

interface IGitHubUserState {
  gitHubUser: IGitHubUser;
}

class GitHubUser extends React.PureComponent<
  IGitHubUserProps,
  IGitHubUserState
> {
  state = {
    gitHubUser: this.props.cookies.get("githubUser"),
  };

  render() {
    return (
      <React.Fragment>
        {this.state.gitHubUser && (
          <UserInfo gitHubUser={this.state.gitHubUser} />
        )}
        {!this.state.gitHubUser && <ModalForm />}
      </React.Fragment>
    );
  }
}

export default GitHubUser;
