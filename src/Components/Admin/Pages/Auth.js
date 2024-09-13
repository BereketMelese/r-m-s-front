import React, { useContext, useState } from "react";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { useForm } from "../../Shared/hooks/form-hook";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validators";

import "../../Shared/styles.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const payload = {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        };
        console.log("Request Payload:", payload);

        const responseData = await sendRequest(
          "http://localhost:5000/api/admins/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.role, responseData.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const formData = {
          username: formState.inputs.name.value,
          password: formState.inputs.password.value,
          email: formState.inputs.email.value,
        };

        console.log(formData);
        const responseData = await sendRequest(
          "http://localhost:5000/api/admins/register",
          "POST",
          JSON.stringify(formData),
          {
            "Content-type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.role, responseData.token);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="row g-0">
          {/* Image on the left */}
          <div className="col-lg-6 auth-image d-none d-lg-block">
            <img
              src="https://www.wallpapertip.com/wmimgs/54-549498_high-resolution-wallpaper-food.jpg"
              alt="Food"
              className="img-fluid"
            />
          </div>

          {/* Form on the right */}
          <div className="col-lg-6 d-flex align-items-center one">
            <div className="auth-form p-5">
              <h2 className="mb-4 text-center">
                {isLoginMode ? "Welcome to Bite & Bliss" : "Join Bite & Bliss"}
              </h2>
              <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                  <div className="box">
                    <Input
                      label="Name"
                      element="input"
                      id="name"
                      type="text"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter your name."
                      onInput={inputHandler}
                    />
                  </div>
                )}
                <div className="box">
                  <Input
                    label="Email Address"
                    element="input"
                    id="email"
                    type="email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email."
                    onInput={inputHandler}
                  />
                </div>
                <div className="box">
                  <Input
                    label="Password"
                    element="input"
                    id="password"
                    type="password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter at least 6 characters."
                    onInput={inputHandler}
                  />
                </div>
                <div className="d-grid mt-4">
                  <Button
                    type="submit"
                    disabled={!formState.isValid}
                    className="btn btn-primary rounded-pill"
                  >
                    {isLoginMode ? "Login" : "Sign Up"}
                  </Button>
                </div>
              </form>

              <div className="text-center mt-3">
                <Button
                  type="button"
                  inverse
                  onClick={switchModeHandler}
                  className="btn btn-link"
                >
                  {isLoginMode
                    ? "Create an account"
                    : "Already have an account?"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
