import React, { useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import styles from "./modalForm.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Row, Col } from "react-flexbox-grid";
import {
  Input,
  DatePickerControl,
  ButtonControl,
  LinearLoader,
} from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";

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
});

interface IModalFormProps {}

const ModalForm: React.SFC<IModalFormProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies(["name"]);

  const handleClose = () => {
    setOpen(false);
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
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                setCookie("githubUser", values, { path: "/" });
                setSubmitting(false);
                setOpen(false);
              }, 2000);
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
                          value={values.gitUser}
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
                    <Row center="xs">
                      <Col xs={12}>
                        {!isSubmitting && (
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
                        )}
                        {isSubmitting && <LinearLoader />}
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
