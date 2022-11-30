import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import "./Home.css";
import VacationList from "../VacationList/VacationList";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import vacationsService from "../../../Services/VacationsService";

function Home(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    const navigate = useNavigate()

    // AJAX Side Effect:
    useEffect(() => {
        if(!authService.expLoggedIn()){
            navigate("/login")
            authService.logout();
            vacationsService.flushAll();
        }

        setUser(authStore.getState().user);
        
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="Home">
            {!user && (
                <>
                    <Login />
                </>
            )}

            {user && <>
                <VacationList />
            </>}


        </div>
    );
}

export default Home;
