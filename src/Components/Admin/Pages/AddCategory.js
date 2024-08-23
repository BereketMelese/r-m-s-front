import React, { useContext } from "react";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { VALIDATOR_REQUIRE } from "../../Shared/Util/validators";
import { useForm } from "../../Shared/hooks/form-hook";

import "../../Shared/styles.css";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";

const AddCategory = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/category/add`,
        "POST",
        JSON.stringify({ name: formState.inputs.name.value }),
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (error) {}
  };
  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={submitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Category Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid category name."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD CATEGORY
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
