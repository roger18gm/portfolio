const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: 2,
  },
  nameText: {
    fontSize: {
      xs: "1.25rem", // small screens
      sm: "1.25rem",
      md: "2rem", // medium screens and up
      lg: "2.25rem",
    },
    // fontWeight: "bold",
    padding: 1,
  },
  title: {
    fontSize: {
      xs: "1.25rem", // small screens
      sm: "1.25rem",
      md: "1.75rem", // medium screens and up
      lg: "1.75rem",
    },
    // fontWeight: "bold",
    paddingBottom: "1rem",
  },
  bioSection: {
    my: 5,
    pt: 3,
    px: 2,
    mx: {
      md: 15,
    },
  },
  bioText: {
    fontSize: {
      xs: "1rem", // small screens
      sm: "1rem",
      md: "1.25rem", // medium screens and up
      lg: "1.25rem",
    },
    paddingBottom: "2rem",
  },

  bottomSection: {
    mx: {
      md: 15,
    },
  },
};

export default styles;
