import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function Register(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserModel>();
  const [isTaken, setIsTaken] = useState<boolean>(false);

  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      const isTaken = await authService.usernameIsTaken(user.username);
      if (isTaken) {
        setIsTaken(true);
        return;
      } else {
        setIsTaken(false);
      }

      await authService.register(user);
      notifyService.success("Welcome!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Register-Background">
      <div className="Register">
        <form onSubmit={handleSubmit(send)}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <b>Create your account</b>
              </Typography>
              <Typography variant="body2">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: { value: true, message: "Missing first name" },
                    minLength: {
                      value: 2,
                      message: "First name must be inclode at least 2 chars",
                    },
                    maxLength: {
                      value: 100,
                      message: "First name can't be over 100 chars",
                    },
                  })}
                />
                <span>{formState.errors.firstName?.message}</span>
              </Typography>
              <Typography variant="body2">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: { value: true, message: "Missing last name" },
                    minLength: {
                      value: 2,
                      message: "Last name must be inclode at least 2 chars",
                    },
                    maxLength: {
                      value: 100,
                      message: "Last name can't be over 100 chars",
                    },
                  })}
                />
                <span>{formState.errors.lastName?.message}</span>
              </Typography>
              <Typography variant="body2">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: { value: true, message: "Missing username" },
                    minLength: {
                      value: 4,
                      message: "Username must be inclode at least 4 chars",
                    },
                    maxLength: {
                      value: 100,
                      message: "Username can't be over 100 chars",
                    },
                  })}
                />
                {(formState.errors.username?.message && (
                  <span>{formState.errors.username?.message}</span>
                )) ||
                  (isTaken && <span>Username is taken</span>)}
                {/* {isTaken && <span>Username is taken</span>} */}
              </Typography>
              <Typography variant="body2">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: {
                      value: 4,
                      message: "Password must be inclode at least 4 chars",
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
                Register
              </StyledButton>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Register;
