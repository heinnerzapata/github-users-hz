import React from "react";
import { IGitHubUser } from "models";
import { Grid, Row, Col } from "react-flexbox-grid";
import styles from "./userInfo.module.scss";

interface IUserInfoProps {
  gitHubUser: IGitHubUser;
}

const UserInfo: React.SFC<IUserInfoProps> = (props) => {
  return (
    <section className={styles.userInfo}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={6}>
            <h1>
              {props.gitHubUser.name} {props.gitHubUser.lastName}
            </h1>
          </Col>
          <Col xs={6}>
            <h3>Bird date: {props.gitHubUser.date}</h3>
          </Col>
        </Row>
      </Grid>
    </section>
  );
};

export default UserInfo;
