import { Button, List, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import EmailIcon from '@mui/icons-material/Email';

export default function NavBar() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <nav>
            <List
            sx={{
                display: "flex",
                justifyContent:"center",
                alignContent:"space-around",
                gap:".8rem"
            }}>
                <li>
                    <Link to='/'>
                        <Button variant="outlined" endIcon={<HomeIcon />}>
                            {!isSmallScreen && "Home"}
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to='/work'>
                        <Button variant="outlined" endIcon={<WorkIcon />}>
                        {!isSmallScreen && "Work"}
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to='/projects'>
                        <Button variant="outlined" endIcon={<BuildIcon />}>
                        {!isSmallScreen && "Projects"}
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to='/contact'>
                        <Button variant="outlined" endIcon={<EmailIcon />}>
                        {!isSmallScreen && "Contact"}
                        </Button>
                    </Link>
                </li>
            </List>
        </nav>
    );
}