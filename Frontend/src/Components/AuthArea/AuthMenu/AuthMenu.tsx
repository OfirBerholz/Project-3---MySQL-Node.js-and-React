import { Button, ButtonGroup, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="AuthMenu">      
      {!user && (
        <>
          <span>Hello Guest | </span>
          <ButtonGroup size="small">
            <StyledButton variant="contained">
              <NavLink to="/login">Login</NavLink>
            </StyledButton>
            <StyledButton variant="contained">
              <NavLink to="/register">Register</NavLink>
            </StyledButton>
          </ButtonGroup>
        </>
      )}

      {user && (
        <>
          <span>
            {user.firstName} {user.lastName} |{" "}
          </span>
          <StyledButton variant="contained">
            <NavLink to="/logout">Logout</NavLink>
          </StyledButton>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
