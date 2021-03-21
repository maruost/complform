import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { MainContainer } from "./MainContainer";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./PrimaryButton";
import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import { useData } from "./DataContex";

const schema = Joi.object({
  firstName: Joi.string()
    .pattern(/^([^0-9]*)$/)
    .required()
    .messages({
      "string.empty": `Поле "Имя" должно быть обязательно заполнено`,
    }),
  lastName: Joi.string()
    .pattern(/^([^0-9]*)$/)
    .required()
    .messages({
      "string.empty": `Поле "Фамилия" должно быть обязательно заполнено`,
    }),
});

export const Step1 = ({ ...props }) => {
  const history = useHistory();
  const { data, setValues } = useData();

  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onChange",
    resolver: joiResolver(schema),
  });

  const { isValid } = formState;
  const onSubmit = (data) => {
    data.fullName = `${data.firstName} ${data.lastName}`;
    history.push("/step2");
    setValues(data);
  };

  return (
    <MainContainer {...props}>
      <Typography component="h2" variant="h5">
        Шаг 1: Имя и Фамилия
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="firstName"
          type="text"
          label="Имя"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Фамилия"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton disabled={!isValid}>Дальше</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
