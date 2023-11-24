/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignInBasic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [repeatPasswordSuccess, setRepeatPasswordSuccess] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailSuccess(true);
      setEmailError(false);
    } else {
      setEmailSuccess(false);
      setEmailError(true);
    }
    setSubmitted(false);
  };

  const validatePassword = (password) => {
    return String(password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (validatePassword(e.target.value)) {
      setPasswordSuccess(true);
      setPasswordError(false);
    } else {
      setPasswordSuccess(false);
      setPasswordError(true);
    }
    if (e.target.value == repeatPassword) {
      setRepeatPasswordSuccess(true);
      setRepeatPasswordError(false);
    } else {
      setRepeatPasswordSuccess(false);
      setRepeatPasswordError(true);
    }
  };

  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value != password) {
      setRepeatPasswordError(true);
      setRepeatPasswordSuccess(false);
    } else {
      setRepeatPasswordError(false);
      setRepeatPasswordSuccess(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      repeatPasswordError ||
      passwordError ||
      emailError
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  const successMessage = () => {
    return (
      <MKTypography
        className="success"
        variant="body1"
        color="black"
        textAlign="center"
        opacity={0.8}
        mt={1}
        mb={3}
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h4>
          <center>
            <br />
            User {email}
            <br />
            successfully registered!!
          </center>
        </h4>
      </MKTypography>
    );
  };

  const errorMessage = () => {
    return (
      <MKTypography
        className="error"
        variant="body1"
        color="black"
        textAlign="center"
        opacity={0.8}
        mt={1}
        mb={3}
        style={{
          display: error ? "" : "none",
        }}
      >
        <h4>
          <br />
          Please correct the below fields
        </h4>
      </MKTypography>
    );
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "#",
          label: "Support",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Register
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                      hidden={submitted}
                    >
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                      hidden={submitted}
                    >
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                      hidden={submitted}
                    >
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <div className="messages">
                {errorMessage()}
                {successMessage()}
              </div>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" hidden={submitted}>
                  <MKBox mb={2}>
                    <MKInput
                      onChange={handleEmail}
                      type="email"
                      label="Email"
                      error={emailError}
                      success={emailSuccess}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      onChange={handlePassword}
                      type="password"
                      label="Password"
                      error={passwordError}
                      success={passwordSuccess}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      onChange={handleRepeatPassword}
                      type="repeat-password"
                      label="Repeat Password"
                      error={repeatPasswordError}
                      success={repeatPasswordSuccess}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                      register
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

// TODO: run listener on id=sign-in and set SignedIn bool for routes

export default SignInBasic;
