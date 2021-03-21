import React from "react";
import { Container, Paper } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

export const MainContainer = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={styles.root}
      {...props}
    >
      <Paper className={styles.paper}>{children}</Paper>
    </Container>
  );
};
