import axios from "axios";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  OutlinedInput,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Login successful:", response.data);
      setSnackbar({ open: true, message: "Login successful!" }); // <-- set snackbar state
      await checkAuth();
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
      setSnackbar({
        open: true,
        message: "Login failed. Please check your credentials.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ margin: { md: "2rem 8rem", lg: "2rem 18rem" } }}>
      <Typography variant="h3" gutterBottom>
        Login Below
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid spacing={3}>
          <FormGrid size={{ xs: 12, md: 6 }} paddingBottom={2}>
            <FormLabel htmlFor="email-address" required>
              Email Address
            </FormLabel>
            <OutlinedInput
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="current-email"
              placeholder="email@address.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGrid>

          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="full-name" required>
              Password
            </FormLabel>
            <OutlinedInput
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGrid>
          <Box paddingTop={5}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              endIcon={<SendIcon />}
              fullWidth
              loading={isSubmitting}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </form>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default LoginPage;
