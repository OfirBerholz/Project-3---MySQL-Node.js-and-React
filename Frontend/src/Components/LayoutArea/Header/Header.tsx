import { useState, useEffect } from "react";
import { Button, ButtonGroup, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import "./Header.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function Header(): JSX.Element {

    // const classes = useStyles();

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
        <div className="Header">

            {user?.roleID === 1 &&
                <div className="MenuHeader">
                    <ButtonGroup size="small">
                        <StyledButton variant="contained">
                            <NavLink to="/home">Vacations</NavLink>
                        </StyledButton>
                        <StyledButton variant="contained" endIcon={<SignalCellularAltIcon/>}>
                        <NavLink to="/chart">See Report</NavLink>
                        </StyledButton>
                    </ButtonGroup>
                </div>
            }
            <AuthMenu />
        </div>
    );
}

export default Header;
