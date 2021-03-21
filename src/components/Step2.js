import { Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { React } from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { MainContainer } from "./MainContainer";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./PrimaryButton";
import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import { useData } from "./DataContex";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Поле "E-mail" должно быть обязательно заполнено`,
      "string.email": `Введите действующий E-mail`,
    }),
  phoneNumber: Joi.string()
    .pattern(/^([^A-Za-zА-ЯЁа-яё]*)$/)
    .messages({
      "string.pattern.base": `Номер телефона не может содержать буквы`,
      "string.empty": `Введите номер телефона`,
    }),
}).unknown();

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }
  return phoneNumber.formatInternational();
};

export const Step2 = ({ ...props }) => {
  const history = useHistory();
  const { data, setValues } = useData();

  const { register, handleSubmit, errors, watch, formState } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onChange",
    resolver: joiResolver(schema),
  });

  const { isValid } = formState;
  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("/result");
    if (!hasPhone) data.phoneNumber = null;
    setValues(data);
  };
  return (
    <MainContainer {...props}>
      <Typography component="h2" variant="h5">
        Шаг 2: Контакты
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="text"
          label="E-mail"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              color="primary"
              inputRef={register}
              name="hasPhone"
            />
          }
          label="У вас есть телефон?"
        />

        {hasPhone && (
          <Input
            placeholder="+7XXXXXXXXXX"
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Номер телефона"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <PrimaryButton disabled={!isValid}>Дальше</PrimaryButton>
        <PrimaryButton
          color="default"
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          Назад
        </PrimaryButton>
      </Form>
    </MainContainer>
  );
};
