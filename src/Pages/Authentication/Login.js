  import PropTypes from "prop-types";
  import React, { useEffect } from "react";
  import logolight from "../../assets/images/logo-light.png";
  import logodark from "../../assets/images/logo-dark.png";

  import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

  //redux
  import { useSelector, useDispatch } from "react-redux";

  import { Link, useNavigate } from "react-router-dom";
  import withRouter from "../../components/Common/withRouter";

  // Formik validation
  import * as Yup from "yup";
  import { useFormik } from "formik";

  //Social Media Imports
  import { GoogleLogin } from "react-google-login";
  // import TwitterLogin from "react-twitter-auth"
  import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

  // actions
  import { loginUser, loginSuccess, socialLogin } from "../../store/actions";

  //Import config
  import { facebook, google } from "../../config";

  import { createSelector } from 'reselect';

  import * as url from "../../helpers/url_helper";
  import { APIClient } from "../../helpers/api_helper";
 
  const api = new APIClient()


  const Login = props => {
    document.title = "Login | KUE + HAN";

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: Yup.object({
        username: Yup.string().required("Please Enter Your Username"),
        password: Yup.string().required("Please Enter Your Password"),
      }),
      onSubmit: (values) => {
        api.create(`${url.LOGIN}`, values).then((data) => {
          if(data.token){
            localStorage.setItem('authToken', data.token);
            dispatch(loginSuccess(data));
            navigate('/dashboard')
          } else {
            console.log('gagal')
          }
        }) //LOGIN
      }
    });

    const loginpage = createSelector(
      (state ) => state.login,
      (state) => ({
          error: state.error,
      })
    );
  // Inside your component
  const { error } = useSelector(loginpage);

    //handleFacebookLoginResponse
    // const facebookResponse = response => {
    //   signIn(response, "facebook");
    // };

    useEffect(() => {
      document.body.className = "bg-pattern";
      // remove classname when component will unmount
      return function cleanup() {
        document.body.className = "";
      };
    });

    return (
      <React.Fragment>
      
      <div className="bg-overlay"></div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card>
                <CardBody className="p-4">
                  <div>
                    <div className="text-center">
                      <Link to="/">
                        <img
                          src={logodark}
                          alt=""
                          height="24"
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="24"
                          className="auth-logo logo-light mx-auto"
                        />
                      </Link>
                    </div>
                    <h4 className="font-size-18 text-muted mt-2 text-center">
                      Welcome Back!
                    </h4>
                    <p className="mb-5 text-center">
                      Sign in to continue to Kue + Han.
                    </p>
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger"><div>{error}</div></Alert> : null}
                      <Row>
                        <Col md={12}>
                          <div className="mb-4">
                          <Label className="form-label">Username</Label>
                          <Input
                            name="username"
                            className="form-control"
                            placeholder="Enter Username"
                            type="username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username && validation.errors.username ? true : false
                            }
                          />
                          {validation.touched.username && validation.errors.username ? (
                            <FormFeedback type="invalid"><div>{validation.errors.username}</div></FormFeedback>
                          ) : null}
                          </div>
                          <div className="mb-4">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid"><div> {validation.errors.password} </div></FormFeedback>
                            ) : null}
                          </div>

                          <Row>
                            {/* <Col>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                />
                                <label
                                  className="form-label form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </label>
                              </div>
                            </Col> */}
                            {/* <Col className="col-7">
                              <div className="text-md-end mt-3 mt-md-0">
                                <Link
                                  to="/auth-recoverpw"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock"></i> Forgot your
                                  password?
                                </Link>
                              </div>
                            </Col> */}
                          </Row>
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                          <div className="mt-4 text-center">
                        {/* <h5 className="font-size-14 mb-3">Sign in with</h5> */}
                      </div>

                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              {/* <div className="mt-5 text-center">
                <p className="text-white-50">
                  Don't have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Register{" "}
                  </Link>{" "}
                </p>
                <p className="text-white-50">
                  © {new Date().getFullYear()} Upzet. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesdesign
                </p>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
    );
  };

  export default withRouter(Login);

  Login.propTypes = {
    history: PropTypes.object,
  };
