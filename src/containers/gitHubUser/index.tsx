import React from "react";
import { ModalForm, UserInfo } from "components";
import { Cookies } from "react-cookie";
import { Grid, Row, Col } from "react-flexbox-grid";
import { IGitHubUser } from "models";
import { Input, ReposTable } from "components";
import styles from "./gitHubUser.module.scss";
import API from "utils/API";
import { IGitHubUserRepo } from "models";

interface IGitHubUserProps {
  cookies: Cookies;
  userInfo: IGitHubUser | null;
  setUserInfo: (userInfo: any) => void;
}

interface IGitHubUserState {
  search: string;
  reposList: IGitHubUserRepo[];
  filteredList: IGitHubUserRepo[];
}

class GitHubUser extends React.PureComponent<
  IGitHubUserProps,
  IGitHubUserState
> {
  state = {
    search: "",
    reposList: [],
    filteredList: [],
  };

  filterList = (query: string) => {
    let filteredList: IGitHubUserRepo[] = this.state.reposList.filter(
      (repo: IGitHubUserRepo) => {
        return repo.name.toLowerCase().search(query) !== -1;
      }
    );
    this.setState({ filteredList });
  };

  handleSearchChange = (e: any) => {
    this.setState({ search: e.target.value }, () => {
      this.filterList(this.state.search);
    });
  };

  validateCookie = () => {
    const prevCookie = this.props.cookies.get("githubUser");
    if (prevCookie && prevCookie !== null && prevCookie.name) {
      this.props.setUserInfo(prevCookie);
    }
  };

  getUserRepos = async () => {
    if (this.props.userInfo !== null) {
      try {
        const reposList: IGitHubUserRepo[] = (
          await API.get(
            `https://api.github.com/users/${this.props.userInfo.gitUser}/repos`
          )
        ).data.map((repo: any) => {
          return {
            name: repo.name,
            default_branch: repo.default_branch,
            language: repo.language,
            git_url: repo.git_url,
            description: repo.description,
          };
        });

        this.setState({ reposList }, () => {
          this.filterList(this.state.search);
        });
      } catch (error) {}
    }
  };

  componentDidUpdate(prevProps: IGitHubUserProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.getUserRepos();
    }
  }

  componentDidMount() {
    this.validateCookie();
    this.getUserRepos();
  }

  render() {
    return (
      <React.Fragment>
        <Grid className={styles.gitHubUser}>
          <Row>
            <Col xs={12}>
              {this.props.userInfo !== null && (
                <UserInfo
                  userInfo={this.props.userInfo}
                  setUserInfo={this.props.setUserInfo}
                />
              )}
            </Col>
          </Row>
          <Row className={styles.searchRow} center="xs">
            <Col xs={7}>
              <Input
                id="search"
                name="search"
                label="Repo name"
                errorText=""
                type="text"
                onChange={this.handleSearchChange}
                value={this.state.search}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {this.props.userInfo === null && (
                <ModalForm
                  userInfo={this.props.userInfo}
                  setUserInfo={this.props.setUserInfo}
                />
              )}
            </Col>
          </Row>
          {this.state.filteredList.length > 0 && this.props.userInfo !== null && (
            <Row center="xs">
              <Col xs={12}>
                <ReposTable list={this.state.filteredList} />
              </Col>
            </Row>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default GitHubUser;
