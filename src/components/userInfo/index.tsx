import React from "react";
import { IGitHubUser } from "models";
import { Grid, Row, Col } from "react-flexbox-grid";
import styles from "./userInfo.module.scss";
import { ButtonControl } from "components";
import { useCookies } from "react-cookie";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import moment from "moment";

interface IUserInfoProps {
  userInfo: IGitHubUser;
  setUserInfo: (userInfo: any) => void;
}

const UserInfo: React.SFC<IUserInfoProps> = (props) => {
  const [cookies, setCookie] = useCookies(["name"]);

  return (
    <section className={styles.userInfo}>
      {props.userInfo.avatar && (
        <img
          alt="user"
          className={styles.avatar}
          src={props.userInfo.avatar ? props.userInfo.avatar : ""}
        />
      )}
      {!props.userInfo.avatar && (
        <AccountCircleIcon className={styles.avatar}></AccountCircleIcon>
      )}

      <Grid fluid>
        <Row middle="xs">
          <Col xs={6}>
            <Row>
              <Col>
                <h1>
                  {props.userInfo.name.toUpperCase()}{" "}
                  {props.userInfo.lastName.toUpperCase()}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className={styles.tag}>Email:</span>{" "}
                <span className={styles.value}>{props.userInfo.email}</span>
              </Col>
              <Col>
                <span className={styles.tag}>GitHub User:</span>{" "}
                <span className={styles.value}>{props.userInfo.gitUser}</span>
              </Col>
              <Col>
                <span className={styles.tag}>Id:</span>{" "}
                <span className={styles.value}>{props.userInfo.id}</span>
              </Col>
              <Col>
                <span className={styles.tag}>Bird Date:</span>{" "}
                <span className={styles.value}>
                  {moment(props.userInfo.date).format("YYYY-MM-DD")}
                </span>
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <Row end="xs">
              <Col></Col>
              <Col>
                <ButtonControl
                  type="button"
                  onClick={() => {
                    props.setUserInfo(null);
                    setCookie("githubUser", null, { path: "/" });
                  }}
                >
                  Reset User
                </ButtonControl>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </section>
  );
};

export default UserInfo;
