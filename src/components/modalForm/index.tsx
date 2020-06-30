import React, { useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import styles from "./modalForm.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Row, Col } from "react-flexbox-grid";
import { IGitHubUser } from "models";
import {
  Input,
  DatePickerControl,
  ButtonControl,
  LinearLoader,
} from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import API from "utils/API";

const numericRegExp = /^^[0-9]*$/;

const githubUserModalForm = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  id: Yup.string()
    .matches(numericRegExp, "Id number is not valid")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  gitUser: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // .test("userGitHubExist", "User does not exist", async (value) => {
  //   //api.github.com/users/{username}
  //   try {
  //     await API.get(`https://api.github.com/users/${value}`);
  //     debugger;
  //     return true;
  //   } catch (error) {
  //     debugger;
  //     return false;
  //   }
  // }),
});

interface IModalFormProps {
  userInfo: IGitHubUser | null;
  setUserInfo: (userInfo: IGitHubUser) => void;
}

const ModalForm: React.SFC<IModalFormProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [alertUser, setAlertUser] = React.useState(false);
  const [cookies, setCookie] = useCookies(["githubUser"]);

  const handleClose = () => {
    if (props.userInfo === null) return;
    setOpen(false);
  };

  const submitHandler = async (
    setSubmitting: (value: boolean) => void,
    resetForm: (values: any) => void,
    values: IGitHubUser
  ) => {
    setSubmitting(true);
    try {
      const user = await API.get(
        `https://api.github.com/users/${values.gitUser}`
      );

      let valuesToSave = user.data
        ? { ...values, avatar: user.data.avatar_url }
        : values;

      setCookie("githubUser", valuesToSave, { path: "/" });
      props.setUserInfo(valuesToSave);
      setSubmitting(false);
      setOpen(false);
    } catch (err) {
      setAlertUser(true);
      setSubmitting(false);
      resetForm({});
    } finally {
      // setCookie("githubUser", values, { path: "/" });
      // props.setUserInfo(values);
      // setSubmitting(false);
      // setOpen(false);
    }
  };

  const getFormBody = () => {
    return (
      <Card className={styles.Card}>
        <CardContent>
          <Formik
            initialValues={{
              name: "",
              lastName: "",
              id: "",
              email: "",
              gitUser: "",
              date: new Date(),
            }}
            validationSchema={githubUserModalForm}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              submitHandler(setSubmitting, resetForm, values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <form className={styles.formBody} onSubmit={handleSubmit}>
                  <Grid fluid>
                    <Row>
                      <Col xs={12}>
                        <h1 className={styles.title}>User Info</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Input
                          id={"name"}
                          name={"name"}
                          disabled={isSubmitting}
                          error={errors.name !== undefined && touched.name}
                          value={values.name}
                          onBlur={handleBlur}
                          type="text"
                          label="Name"
                          onChange={handleChange}
                          errorText={
                            errors.name !== undefined && touched.name
                              ? errors.name
                              : ""
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Input
                          id={"lastName"}
                          name={"lastName"}
                          disabled={isSubmitting}
                          error={
                            errors.lastName !== undefined && touched.lastName
                          }
                          value={values.lastName}
                          onBlur={handleBlur}
                          type="text"
                          label="Lastname"
                          onChange={handleChange}
                          errorText={
                            errors.lastName !== undefined && touched.lastName
                              ? errors.lastName
                              : ""
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Input
                          id={"email"}
                          name={"email"}
                          disabled={isSubmitting}
                          error={errors.email !== undefined && touched.email}
                          type="text"
                          onChange={handleChange}
                          value={values.email}
                          onBlur={handleBlur}
                          label="Email"
                          errorText={
                            errors.email !== undefined && touched.email
                              ? errors.email
                              : ""
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Input
                          id={"gitUser"}
                          name={"gitUser"}
                          disabled={isSubmitting}
                          error={
                            errors.gitUser !== undefined && touched.gitUser
                          }
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.gitUser || ""}
                          label="Git Username"
                          errorText={
                            errors.gitUser !== undefined && touched.gitUser
                              ? errors.gitUser
                              : ""
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={2}>
                        <DatePickerControl
                          name={"date"}
                          disabled={isSubmitting}
                          value={values.date}
                          onChangeDate={setFieldValue}
                        />
                      </Col>
                      <Col xs={12} md={10}>
                        <Input
                          id={"id"}
                          name={"id"}
                          disabled={isSubmitting}
                          error={errors.id !== undefined && touched.id}
                          value={values.id}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          label="Id"
                          errorText={
                            errors.id !== undefined && touched.id
                              ? errors.id
                              : ""
                          }
                        />
                      </Col>
                    </Row>
                    {alertUser && (
                      <Row>
                        <Col xs={12}>
                          <div className={styles.alert}>
                            it seems GitHub User does not exist !!
                          </div>
                        </Col>
                      </Row>
                    )}
                    <Row
                      className={isSubmitting ? styles.hidden : ""}
                      center="xs"
                    >
                      <Col xs={12}>
                        <ButtonControl
                          disabled={
                            Object.keys(errors).length !== 0 ||
                            Object.keys(touched).length === 0 ||
                            isSubmitting
                          }
                          type="submit"
                          onClick={() => {}}
                        >
                          Save
                        </ButtonControl>
                      </Col>
                    </Row>
                    <Row className={!isSubmitting ? styles.hidden : ""}>
                      <Col xs={12}>
                        <LinearLoader />
                      </Col>
                    </Row>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        {getFormBody()}
      </Modal>
    </React.Fragment>
  );
};

export default ModalForm;
