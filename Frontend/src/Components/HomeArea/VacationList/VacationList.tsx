import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import AddIcon from "@mui/icons-material/Add";
import { Checkbox, Fab, FormControlLabel, FormGroup, Pagination } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const itemsPerPage = 10;
    const [page, setPage] = useState<number>(1);
    const [numOfPages, setNumOfPage] = useState<number>();
    const [checked, setChecked] = useState<boolean>(false);
    const [followingVacations, setFollowingVacations] = useState<VacationModel[]>([])

    const user = authStore.getState().user;

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    useEffect(() => {
        vacationsService
            .getAllVacations()
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));

        setFollowingVacations(vacations.filter((v) => { return v.isFollowing === 1 }))

        setNumOfPage(Math.ceil(vacations.length / itemsPerPage))

        if(checked) {setNumOfPage(Math.ceil(followingVacations.length / itemsPerPage))}
    }, [vacations, user, checked]);

    return (
        <div className="VacationList">
            {vacations.length === 0 && <Loading />}

            {user.roleID === 1 && <>
                <NavLink to="/vacations/add">
                    <Fab color="primary" aria-label="add" className="AddVacationButton">
                        <AddIcon />
                    </Fab>
                </NavLink>
            </>}

            {user.roleID === 2 && <>
                <FormGroup className="isFollowingButton">
                    <FormControlLabel control={
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckBoxChange}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />} />
                    }
                        label="Following"
                    />
                </FormGroup>
            </>}

            {checked && followingVacations.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(vac => { return (<VacationCard key={vac.vacationID} vacation={vac} />) })}
            {!checked && vacations.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(v => { return (<VacationCard key={v.vacationID} vacation={v} />) })}


            <Pagination count={numOfPages} page={page} onChange={handleChange} defaultPage={1} color="primary" size="large" showFirstButton showLastButton />
        </div>
    );
}

export default VacationList;
