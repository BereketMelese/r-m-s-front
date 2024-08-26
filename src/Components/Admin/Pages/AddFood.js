import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { useForm } from "../../Shared/hooks/form-hook";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import Input from "../../Shared/Components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Shared/Util/validators";
import Button from "../../Shared/Components/FormElements/Button";

import "../../Shared/styles.css";

const AddFood = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      categoryName: {
        value: "",
        isValid: false,
      },
      points: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/category"
        );

        setCategories(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [sendRequest]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/food/add",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          price: formState.inputs.price.value,
          image: formState.inputs.image.value,
          categoryName: formState.inputs.categoryName.value,
          points: formState.inputs.points.value,
        }),
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (error) {}
  };

  return (
    <div>
      <h2>Add Food</h2>
      <form onSubmit={submitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Food Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="number"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price"
          onInput={inputHandler}
        />
        <Input
          id="image"
          element="input"
          type="type"
          label="Image URL"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid image URL"
          onInput={inputHandler}
        />
        <Input
          id="points"
          element="input"
          type="number"
          label="Point"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid point"
          onInput={inputHandler}
        />
        <Input
          element="select"
          id="categoryName"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a category"
          onInput={inputHandler}
          options={categories}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD FOOD
        </Button>
      </form>
    </div>
  );
};

export default AddFood;
