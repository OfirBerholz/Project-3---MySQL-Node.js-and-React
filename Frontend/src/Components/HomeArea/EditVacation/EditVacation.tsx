import { Button, Card, CardActions, CardContent, Container, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import useVerifyAdmin from "../../../Utils/UseVerifyAdmin";
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function EditVacation(): JSX.Element {

    useVerifyAdmin();

    const [fromDate, setFromDate] = useState<Date>();
    const [untilDate, setUntilDate] = useState<Date>();
    const [dates, setDates] = useState<Date[]>([null, null]);
    const [dateError, setDateError] = useState<string>("");

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    const { beforeToday } = DateRangePicker;

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const id = +params.vId;
        
        vacationsService
            .getOneVacation(id)
            .then((v) => {
                setFromDate(new Date(v.fromDate));
                setUntilDate(new Date(v.untilDate));
                setValue("vacationID", v.vacationID);
                setValue("destination", v.destination);
                setValue("description", v.description);
                setValue("price", v.price);
                setValue("imageName", v.imageName);
            })
            .catch((err) => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        if (dates.length < 1 || dates[0] === null || dates[1] === null) {
            setDateError("Missing dates");
            return;
        }
        try {
            vacation.fromDate = dates[0];
            vacation.untilDate = dates[1];
            await vacationsService.updateVacation(vacation);
            notifyService.success("Updated!");
            navigate("/");
        } catch (err: any) {
            alert(err.message)
            await notifyService.error(err);
        }
    }

    return (
        <Container className="EditVacation" maxWidth="sm">
            {fromDate && 
            <form onSubmit={handleSubmit(send)} className="EditVacationForm">
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Edit Vacation
                        </Typography>
                        <input type="hidden" {...register("vacationID")} />
                        <input type="hidden" {...register("imageName")} />

                        <label>Destination:</label>
                        <input type="text" {...register("destination", {
                            required: { value: true, message: "Missing last destination" },
                            minLength: { value: 2, message: "Destination must be include at least 2 chars" },
                            maxLength: { value: 50, message: "Destination can't be over 50 chars" },
                        })} />
                        <span>{formState.errors.destination?.message}</span>

                        <label>Description:</label>
                        <textarea maxLength={550} {...register("description", {
                            required: { value: true, message: "Missing description" },
                            minLength: { value: 2, message: "Description must be include at least 2 chars" },
                            maxLength: { value: 550, message: "Description can't be over 550 chars" },
                        })} />
                        <span>{formState.errors.description?.message}</span>

                        <label>Dates:</label>
                        <DateRangePicker 
                            format="dd-MM-yyyy"
                            cleanable={true}
                            placeholder="Select Date Range"
                            block
                            defaultValue={[fromDate, untilDate]}
                            size="xs"
                            showOneCalendar
                            disabledDate={beforeToday()}
                            onChange={(dates) => {
                                setDates(dates);
                                setDateError("");
                            }}
                        />
                        <span>{dateError}</span>

                        <label>Price:</label>
                        <input type="number" {...register("price", {
                            required: { value: true, message: "Missing price" },
                            min: {value: 0, message: "Price can't be negative!" },
                            max: {value: 9999, message: "Price can't be over 9999!"},
                        })} />
                        <span>{formState.errors.price?.message}</span>

                        <label>Image:</label>
                        <input type="file" accept="image/*" {...register("image")} />
                        <span>{formState.errors.image?.message}</span>
                    </CardContent>
                    <CardActions>
                        <StyledButton type="submit">Update</StyledButton>
                    </CardActions>
                </Card>
            </form>
            }
        </Container>
    );
}

export default EditVacation;
