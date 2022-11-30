import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  IconButtonProps,
  styled,
  Collapse,
  Fab,
} from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FollowVacation from "../FollowVacation/FollowVacation";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { vacationsStore } from "../../../Redux/VacationsState";

interface VacationCardProps {
  vacation: VacationModel;
}

// Expand More Props: --------------------------------------------
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
// ---------------------------------------------------------------

function VacationCard(props: VacationCardProps): JSX.Element {
  const userRoleId = authStore.getState().user.roleID;

  const [expanded, setExpanded] = useState(false);
  const [vacation, setVacation] = useState<VacationModel>();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const currentVacation = vacationsStore
      .getState()
      .vacations.find((v) => v.vacationID === props.vacation.vacationID);
    setVacation(currentVacation);

    const unsubscribe = vacationsStore.subscribe(() => {
      setVacation({ ...currentVacation });
    });

    return () => {
      unsubscribe();
    };
  }, [vacation, props]);

  async function deleteVacation() {
    try {
      const iAmSure = window.confirm(
        `Are you sure you want to delete "${vacation.destination}" vacation?`
      );
      if (!iAmSure) return;
      await vacationsService.deleteVacation(vacation.vacationID);
      notifyService.success("Deleted!");
      navigate("/");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="VacationCard">
      {vacation && (
        <>
          <Card className="CardMui">
            <CardHeader
              className="CardHeader"
              title={vacation.destination}
              subheader={
                vacation.fromDateString + " ➡️ " + vacation.untilDateString
              }
            />
            <CardMedia
              component="img"
              image={`http://localhost:3001/api/vacations/images/${vacation.imageName}`}
              alt="Paella dish"
            />
            <CardActions disableSpacing>
              {userRoleId === 2 && <FollowVacation vacation={vacation} />}
              {userRoleId === 1 && (
                <>
                  <NavLink to={"/vacations/edit/" + vacation.vacationID}>
                    <Fab
                      color="primary"
                      size="small"
                      aria-label="edit"
                      className="EditButton"
                    >
                      <EditIcon />
                    </Fab>
                  </NavLink>
                  <Fab
                    color="error"
                    size="small"
                    className="DeleteButton"
                    onClick={deleteVacation}
                  >
                    <DeleteIcon />
                  </Fab>
                </>
              )}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className="CardContent">
                <Typography variant="body2" color="text.secendery">
                  <b>Description:</b> {vacation.description}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secendery">
                  <b>Price:</b> {vacation.price}$
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </>
      )}
    </div>
  );
}

export default VacationCard;
