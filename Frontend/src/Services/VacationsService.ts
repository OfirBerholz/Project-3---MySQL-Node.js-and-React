import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";
import {
  VacationsAction,
  VacationsActionType,
  vacationsStore,
} from "../Redux/VacationsState";
import appConfig from "../Utils/Config";
class VacationsService {
  public async checkEmpty(): Promise<void> {
    if (vacationsStore.getState().vacations === null)
      await this.getAllVacations();
  }

  public flushAll(): void {
    const action: VacationsAction = {
      type: VacationsActionType.FetchVacations,
      payload: null,
    };
    vacationsStore.dispatch(action);
  }

  // Get all vacations from backend:
  public async getAllVacations(): Promise<VacationModel[]> {
    if (vacationsStore.getState().vacations?.length > 0) {
      return vacationsStore.getState().vacations;
    }

    // Fetch all vacations from backend:
    const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

    // Extract vacations from axios response:
    const vacations = response.data;

    vacations.sort((v1, v2) => {
      return new Date(v1.fromDate).valueOf() - new Date(v2.fromDate).valueOf();
    });

    vacations.map((v) => {
      v.fromDateString = new Date(v.fromDate).toLocaleDateString("he-IL");

      v.untilDateString = new Date(v.untilDate).toLocaleDateString("he-IL");

      return vacations;
    });

    // Save fetched vacations in global state:
    const action: VacationsAction = {
      type: VacationsActionType.FetchVacations,
      payload: vacations,
    };
    vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.

    // Return vacations:
    return vacations;
  }

  // Get one vacation by id
  public async getOneVacation(id: number): Promise<VacationModel> {
    // Desired vacation:
    let vacation;

    // Take vacaions resides in redux global state:
    let vacations = vacationsStore.getState().vacations;

    // If we have no vacations in global state - fetch given vacation from server:
    if (vacations.length === 0) {
      // Fetch one vacation from backend:
      const response = await axios.get<VacationModel>(
        appConfig.vacationsUrl + id
      );

      // Save fetched product:
      vacation = response.data;
    } else {
      // Take vacation from redux:
      vacation = vacations.find((v) => v.vacationID === id);
    }

    vacation.fromDateString = this.DateFormat(vacation.fromDate);
    vacation.untilDateString = this.DateFormat(vacation.untilDate);

    // Return vacation:
    return vacation;
  }

  // Add new vacation:
  public async addVacation(vacation: VacationModel): Promise<void> {
    await this.checkEmpty();

    // Convert VacationModel into FormData because we need to send text + image:
    const fromDateValue = vacation.fromDate
      .toISOString()
      .split("T")[0]
      .toString();
    const untilDateValue = vacation.untilDate
      .toISOString()
      .split("T")[0]
      .toString();

    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("image", vacation.image[0]);
    formData.append("fromDate", fromDateValue);
    formData.append("untilDate", untilDateValue);
    formData.append("price", vacation.price.toString());

    // Send vacation to backend:
    const response = await axios.post<VacationModel>(
      appConfig.vacationsUrl,
      formData
    );
    const addedVacation = response.data;

    addedVacation.fromDateString = new Date(
      addedVacation.fromDate
    ).toLocaleDateString("he-IL");
    addedVacation.untilDateString = new Date(
      addedVacation.untilDate
    ).toLocaleDateString("he-IL");

    // Send added vacation to redux global state:
    const action: VacationsAction = {
      type: VacationsActionType.AddVacation,
      payload: addedVacation,
    };
    vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.
  }

  // Update vacation:
  public async updateVacation(vacation: VacationModel): Promise<void> {
    await this.checkEmpty();

    const fromDateBeforeSplit1 = new Date(vacation.fromDate).toISOString();
    vacation.fromDateString = fromDateBeforeSplit1.split("T", 1).toString();

    const untilDateBeforeSplit1 = new Date(vacation.untilDate).toISOString();
    vacation.untilDateString = untilDateBeforeSplit1.split("T", 1).toString();

    // Convert VacationModel into FormData because we need to send text + image:
    const fromDateValue = new Date(vacation.fromDateString)
      .toISOString()
      .split("T")[0]
      .toString();
    const untilDateValue = new Date(vacation.untilDateString)
      .toISOString()
      .split("T")[0]
      .toString();

    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("image", vacation.image[0]);
    formData.append("fromDate", fromDateValue);
    formData.append("untilDate", untilDateValue);
    formData.append("price", vacation.price.toString());

    // Send vacation to backend:
    const response = await axios.put<VacationModel>(
      appConfig.vacationsUrl + vacation.vacationID,
      formData
    );
    const updatedVacation = response.data;

    updatedVacation.fromDateString = new Date(
      updatedVacation.fromDate
    ).toLocaleDateString("he-IL");
    updatedVacation.untilDateString = new Date(
      updatedVacation.untilDate
    ).toLocaleDateString("he-IL");

    if (!updatedVacation.imageName) {
      updatedVacation.imageName = vacation.imageName;
    }

    // Send updated vacation to redux global state:
    const action: VacationsAction = {
      type: VacationsActionType.UpdateVacation,
      payload: updatedVacation,
    };
    vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.
  }

  // Delete vacation:
  public async deleteVacation(id: number): Promise<void> {
    // Delete this vacation in backend:
    await axios.delete(appConfig.vacationsUrl + id);

    // Delete this vacation also in redux global state:
    const action: VacationsAction = {
      type: VacationsActionType.DeleteVacation,
      payload: id,
    };
    vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.
  }

  // Add new follower:
  public async follow(follower: FollowerModel): Promise<void> {
    // Send follower to backend:
    await axios.post<FollowerModel>(appConfig.followUrl, follower);

    const action: VacationsAction = {
      type: VacationsActionType.Follow,
      payload: follower.vacationID,
    };
    vacationsStore.dispatch(action);
  }

  // Delete follower:
  public async unFollow(follower: FollowerModel): Promise<void> {
    // Send follower to backend:
    await axios.post<FollowerModel>(appConfig.unFollowUrl, follower);

    const action: VacationsAction = {
      type: VacationsActionType.Unfollow,
      payload: follower.vacationID,
    };
    vacationsStore.dispatch(action);
  }

  private DateFormat(date: Date) {
    const dateToLocalDate = new Date(date).toLocaleDateString("he-IL", {
      timeZone: "Asia/Jerusalem",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const dateSplit = dateToLocalDate.split(".");
    const dateFormat = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
    return dateFormat;
  }
}

const vacationsService = new VacationsService();

export default vacationsService;
