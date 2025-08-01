const cardStyles = {
  card: {
    height: "100%",
    "&[data-active]": {
      backgroundColor: "action.selected",
      "&:hover": {
        backgroundColor: "action.selectedHover",
      },
    },
  },
  cardBorder: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "16px",
  },
};

export default cardStyles;
