import React from "react";
import { ModalForm } from "components";
import { Cookies } from "react-cookie";

interface IGitHubUserProps {
  cookies: Cookies;
}

class GitHubUser extends React.PureComponent<IGitHubUserProps> {
  render() {
    return (
      <React.Fragment>
        <h1>
          GitHUb User
          {this.props.cookies.get("githubUser") && (
            <React.Fragment>
              {this.props.cookies.get("githubUser").name} -{" "}
              {this.props.cookies.get("githubUser").lastName}
            </React.Fragment>
          )}
        </h1>
        <ModalForm />
      </React.Fragment>
    );
  }
}

export default GitHubUser;
