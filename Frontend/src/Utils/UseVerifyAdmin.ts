import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

export default function useVerifyAdmin() {
    const navigate = useNavigate()

    useEffect(()=>{
        const userRole = authStore.getState().user?.roleID;

        if(!userRole) {
            navigate("/login");
        };

        if(userRole !== 1) {
            navigate("/");
            notifyService.error("Access denied!")
        };
    }, []);
};