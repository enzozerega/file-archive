import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#343434",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > h1": {
      margin: 0,
    },
  },
  uploadForm: {
    display: "flex",
    flexDirection: "column",
    width: "50vw",
    "& > input, select": {
      marginBottom: "1rem",
      borderRadius: "5px",
      padding: "0.2rem",
    },
    "& > input::placeholder": {
      color: "black",
    },
    "& > input:disabled::placeholder, input:disabled": {
      color: "#C0C0C0",
    },
    "& > button": {
      alignSelf: "center",
      padding: "0.5rem",
      margin: "1rem",
      borderRadius: "5px",
      width: "max-content",
    },
  },
  tableCol: {
    flex: 1,
    overflow: "hidden",
  },
  tableRows: {
    height: "15rem",
  },
  tableRow: {
    display: "flex",
  },
  tableHeader: {
    display: "flex",
    width: "80vw",
    borderBottom: "1px solid #C0C0C0",
    marginBottom: "1rem",
    "& > div": {
      display: "flex",
      fontWeight: "bold",
      "& span::first-letter": {
        textTransform: "capitalize",
      },
    },
  },
  tableBody: {
    display: "flex",
    width: "66.7vw",
    textDecoration: "none",
    color: "white",
  },
  tableClear: {
    display: "flex",
    width: "10vw",
  },
  tableIcon: {
    textAlign: "end",
  },
  header: {
    display: "flex",
    width: "100vw",
    maxWidth: "1000px",
    padding: "2rem 0",
    "& > h1": {
      whiteSpace: "pre",
      padding: "0 2rem",
      margin: 0,
      "& > a": {
        textDecoration: "none",
        color: "white",
      },
    },
    "& > nav": {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      "& > a": {
        padding: "0 2rem",
        textDecoration: "none",
        color: "white",
        "&:last-child": {
          marginLeft: "auto",
        },
      },
    },
  },
  main: {
    padding: "2rem",
    width: "100vw",
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pagination: {
    width: "100%",
    display: "flex",
    paddingTop: "2rem",
    "& > button": {
      margin: "0 1rem",
    },
    "& > span": {
      marginLeft: "auto",
    },
  },
}));

export default useStyles;
