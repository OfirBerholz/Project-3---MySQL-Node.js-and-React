import { Button, Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./FollowVacation.css"

const StyledButton = styled(Button)(`
  text-transform: none;
`);

interface FollowVacationProps {
    vacation: VacationModel;
}

function FollowVacation(props: FollowVacationProps): JSX.Element {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    async function follow() {
        try {
            const request = {
                userID: authStore.getState().user.userID,
                vacationID: props.vacation.vacationID
            };
            vacationsService.follow(request);
            setIsFollowing(true);
            notifyService.success("You followed " + props.vacation.destination)
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    async function unFollow() {
        try {
            const request = {
                userID: authStore.getState().user.userID,
                vacationID: props.vacation.vacationID
            };
            vacationsService.unFollow(request);
            setIsFollowing(false);
            notifyService.success("You unfollowed " + props.vacation.destination)
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    useEffect(() => {
        if (props.vacation.isFollowing === 1) { setIsFollowing(true) }
    }, [props]);

    return (
        <div className="FollowVacatoin">
            {isFollowing ?
                <div>
                    <Box className="FollowersCounterBox">{props.vacation.followersCount}</Box>
                    <StyledButton variant="outlined" size="small" className="FollowersButton" disableRipple onClick={unFollow} sx={{'&:hover': {color: 'white'}}}>
                        Unfollow
                    </StyledButton>
                </div> :
                <div>
                    <Box className="FollowersCounterBox">{props.vacation.followersCount}</Box>
                    <StyledButton variant="contained" size="small" className="FollowersButton" disableRipple onClick={follow}>
                        Follow
                    </StyledButton>
                </div>
            }
        </div>
    );
}

export default FollowVacation;
