import React, { useContext, useState } from "react";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { useForm } from "../../Shared/hooks/form-hook";
import Card from "../../Shared/Components/Ui/Card";
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
  const { isLoading, sendRequest } = useHttpClient();

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
        const responseData = await sendRequest(
          "http://localhost:5000/api/chefs/login",
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
          "http://localhost:5000/api/chefs/register",
          "POST",
          JSON.stringify(formData),
          {
            "Content-type": "application/json",
          }
        );

        console.log(responseData);

        auth.login(responseData.userId, responseData.role, responseData.token);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <React.Fragment>
      <Card className="authentication">
        {isLoading}
        <h2>Login Requires</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              error="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            error="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
