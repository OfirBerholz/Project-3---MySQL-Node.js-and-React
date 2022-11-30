import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome Back!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Login-Background">
      <div className="Login">
        <form onSubmit={handleSubmit(send)}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <b>Welcome</b>
              </Typography>
              <Typography variant="body2">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: { value: true, message: "Missing username" },
                    minLength: {
                      value: 4,
                      message: "Username must be include at least 4 chars",
                    },
                    maxLength: {
                      value: 100,
                      message: "Username can't be over 100 chars",
                    },
                  })}
                />
                <span>{formState.errors.username?.message}</span>
              </Typography>
              <Typography variant="body2">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: {
                      value: 4,
                      message: "Password must be include at least 4 chars",
                    },
                    maxLength: {
                      value: 256,
                      message: "Password can't be over 256 chars",
                    },
                  })}
                />
                <span>{formState.errors.password?.message}</span>
              </Typography>
            </CardContent>
            <CardActions>
              <StyledButton type="submit" variant="contained">
                Log In
              </StyledButton>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Login;
