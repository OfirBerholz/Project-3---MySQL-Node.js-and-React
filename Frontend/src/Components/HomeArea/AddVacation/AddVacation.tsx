import { Button, Card, CardActions, CardContent, Container, Typography, styled } from "@mui/material";
import { useState } from "react";
import "./AddVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import useVerifyAdmin from "../../../Utils/UseVerifyAdmin";
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function AddVacation(): JSX.Element {
    useVerifyAdmin();
    const today = new Date();

    const [dates, setDates] = useState<Date[]>([null, null]);
    const [dateError, setDateError] = useState<string>("");

    const { beforeToday } = DateRangePicker;

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        if (dates.length < 1 || dates[0] === null || dates[1] === null) {
            setDateError("Missing dates");
            return;
        }
        try {
            vacation.fromDate = dates[0];
            vacation.untilDate = dates[1];
            await vacationsService.addVacation(vacation);
            notifyService.success("Added!");
            navigate("/");
        } catch (err: any) {
            notifyService.error(err);
        }
    }


    return (
        <Container className="AddVacation" maxWidth="sm">
            <form onSubmit={handleSubmit(send)} className="AddVacationForm">
                <Card>
                    <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Add Vacation
                        </Typography>

                        <label>Destination:</label>
                        <input type="text" required {...register("destination", {
                            required: { value: true, message: "Missing last destination" },
                            minLength: { value: 2, message: "Destination must be include at least 2 chars" },
                            maxLength: { value: 50, message: "Destination can't be over 50 chars" },
                        })} />
                        <span>{formState.errors.destination?.message}</span>

                        <label>Description:</label>
                        <textarea maxLength={550} required {...register("description", {
                            required: { value: true, message: "Missing description" },
                            minLength: { value: 2, message: "Description must be include at least 2 chars" },
                            maxLength: { value: 550, message: "Description can't be over 550 chars" },
                        })} />
                        <span>{formState.errors.description?.message}</span>

                        <label>Dates:</label>
                        <DateRangePicker 
                            
                            format="dd-MM-yyyy"
                            // defaultValue={[dates[0], dates[1]]}
                            cleanable={true}
                            placeholder="Select Date Range"
                            block
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
                        <input type="number" required {...register("price", {
                            required: { value: true, message: "Missing price" },
                            min: { value: 0, message: "Price can't be negative!" },
                            max: { value: 9999, message: "Price can't be over 9999!" },
                        })} />
                        <span>{formState.errors.price?.message}</span>

                        <label>Image:</label>
                        <input type="file" required {...register("image", {
                            required: { value: true, message: "Missing image" },
                        })} />
                        <span>{formState.errors.image?.message}</span>
                    </CardContent>
                    <CardActions>
                        <StyledButton type="submit">Add</StyledButton>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
}

export default AddVacation;
