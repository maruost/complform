import { React } from "react";
import { MainContainer } from "./MainContainer";
import { PrimaryButton } from "./PrimaryButton";
import { useHistory } from "react-router-dom";
import { useData } from "./DataContex";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export const Result = ({ ...props }) => {
  const history = useHistory();
  const { data } = useData();

  function setIcon(value) {
    switch (value) {
      case "email":
        return <AlternateEmailIcon />;
      case "fullName":
        return <PersonIcon />;
      case "phoneNumber":
        return <PhoneIcon />;
      default:
        return <MoreVertIcon />;
    }
  }

  const entries = Object.entries(data);

  return (
    <MainContainer {...props}>
      <Typography component="h2" variant="h5">
        Информация
      </Typography>
      <List>
        {entries.map((entry) => {
          if (
            typeof entry[1] === "string" &&
            entry[0] !== "firstName" &&
            entry[0] !== "lastName"
          ) {
            return (
              <ListItem>
                <ListItemIcon>{setIcon(entry[0])}</ListItemIcon>
                <ListItemText primary={entry[1]} />
              </ListItem>
            );
          }
        })}
      </List>
      <PrimaryButton
        color="primary"
        type="submit"
        onClick={() => {
          console.log("Данные отправлены");
        }}
      >
        Отправить
      </PrimaryButton>
      <PrimaryButton
        color="default"
        type="button"
        onClick={() => {
          history.push("/");
        }}
      >
        Редактировать
      </PrimaryButton>
    </MainContainer>
  );
};
