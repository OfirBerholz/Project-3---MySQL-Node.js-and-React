import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. State - This is the data:
export class VacationsState {
  public vacations: VacationModel[] = []; // Our global data.
}

// 2. Action Type - List of actions we can do on the above state:
export enum VacationsActionType {
  FetchVacations = "FetchVacations", // Fetch all vacations from backend.
  AddVacation = "AddVacation", // Add new vacation.
  UpdateVacation = "UpdateVacation", // Update existing vacation.
  DeleteVacation = "DeleteVacation", // Delete existing vacation.
  Follow = "Follow",
  Unfollow = "Unfollow"
}

// 3. Action - Object for describing a single operation on the state:
export interface VacationsAction {
  type: VacationsActionType; // Which operation we're going to do.
  payload: any; // Which data we're sending.
}

// 4. Reducer - Function which performs the needed operation:
export function vacationsReducer ( currentState = new VacationsState(), action: VacationsAction ): VacationsState {

  const newState = { ...currentState }; // We must duplicate the original state object.

  // Do the change on the newState:
  switch (action.type) {
    case VacationsActionType.FetchVacations: // Here payload must be all vacations fetched from the server.
        newState.vacations = action.payload; // Set all fetched vacations to the state.
        break;

    case VacationsActionType.AddVacation: // Here payload must be the vacation to add.
        newState.vacations.push(action.payload); // Add the new vacation to the state.
        break;

    case VacationsActionType.UpdateVacation: // Here payload must be the vacation to update.
        const indexToUpdate = newState.vacations.findIndex(v => v.vacationID === action.payload.vacationID); // -1 if not exist.
        
        if (indexToUpdate >= 0) {
            newState.vacations[indexToUpdate] = action.payload; // Update
        }

        break;

    case VacationsActionType.DeleteVacation: // Here payload must be id to delete.
        const indexToDelete = newState.vacations.findIndex(v => v.vacationID === action.payload); // -1 if not exist.
        if (indexToDelete >= 0) {
            newState.vacations.splice(indexToDelete, 1); // Delete
        }
        break;

    case VacationsActionType.Follow: // action.payload >>=> id of new follow
        const fIndexToUpdate = newState.vacations.findIndex(v => v.vacationID === action.payload);
        if (fIndexToUpdate >= 0) {
            newState.vacations[fIndexToUpdate].followersCount++;
            newState.vacations[fIndexToUpdate].isFollowing = 1;
        }
        break;

    case VacationsActionType.Unfollow: // action.payload >>=> id of follow to delete
        const fIndexToDelete = newState.vacations.findIndex(v => v.vacationID === action.payload);
        if (fIndexToDelete >= 0) {
            newState.vacations[fIndexToDelete].followersCount--;
            newState.vacations[fIndexToDelete].isFollowing = 0;
            break;
        }
  }

  return newState; // Return the new state
}

// 5. Store - redux object for managing the global state:
export const vacationsStore = createStore(vacationsReducer);