import { AppBar, Button, List, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../context/authContext";

export default function NavBar() {
  const theme = useTheme();
  const { isAuth } = useAuth();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar>
      <nav>
        <List
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "space-around",
            gap: ".8rem",
          }}
        >
          <li>
            <Link to="/">
              <Button variant="contained" endIcon={<HomeIcon />}>
                {!isSmallScreen && "Home"}
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/work">
              <Button variant="contained" endIcon={<WorkIcon />}>
                {!isSmallScreen && "Work"}
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <Button variant="contained" endIcon={<BuildIcon />}>
                {!isSmallScreen && "Projects"}
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <Button variant="contained" endIcon={<EmailIcon />}>
                {!isSmallScreen && "Contact"}
              </Button>
            </Link>
          </li>

          {isAuth ? (
            <li>
              <Link to="/admin">
                <Button variant="contained" endIcon={<SettingsIcon />}>
                  {!isSmallScreen && "Admin"}
                </Button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <Button variant="contained" endIcon={<PersonIcon />}>
                  {!isSmallScreen && "Login"}
                </Button>
              </Link>
            </li>
          )}
        </List>
      </nav>
    </AppBar>
  );
}
