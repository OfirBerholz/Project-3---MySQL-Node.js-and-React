import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";
import FollowerModel from "../4-models/followers-model";

//* Get all vacations:
async function getAllVacations(userID: number): Promise<VacationModel[]> {
  //* Create sql:
  const sql = `SELECT DISTINCT
                V.*,
                EXISTS (SELECT * FROM followers WHERE vacationID = F.vacationID AND userID = ?) AS isFollowing,
                COUNT (F.userID) AS followersCount
                FROM vacations AS V LEFT JOIN followers AS F
                ON V.vacationID = F.vacationID
                GROUP BY vacationID
                ORDER BY isFollowing DESC`;

  //* Get data from database:
  const vacations = await dal.execute(sql, userID);

  //* Return it:
  return vacations;
}

async function getOneVacation(id: number): Promise<VacationModel> {
  const sql = `SELECT
                  * 
                  FROM vacations
                  WHERE vacationID = ?`;

  const vacations = await dal.execute(sql, id); // returns empty array if not found

  const vacation = vacations[0];

  if (!vacation) throw new IdNotFoundError(id);

  return vacation;
}

//* Add new vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  if (vacation.image) {
    const extension = vacation.image.name.substring(
      vacation.image.name.lastIndexOf(".")
    ); // .gif / .png / .jpg / .jpeg
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // mv = move = copy image.
    delete vacation.image; // Delete File before saving.
  }

  const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

  const result: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.imageName,
    vacation.fromDate,
    vacation.untilDate,
    vacation.price,
  ]);

  vacation.vacationID = result.insertId;

  return vacation;
}

//* Update vacation:
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  if (vacation.image) {
    await safeDelete("./src/1-assets/images/" + vacation.imageName);
    const extension = vacation.image.name.substring(
      vacation.image.name.lastIndexOf(".")
    ); // .gif / .png / .jpg / .jpeg
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // mv = move = copy image.
    delete vacation.image; // Delete File before saving.
  }

  let sql = `UPDATE vacations SET
                    destination = ?,
                    description = ?,
                    fromDate = ?,
                    untilDate = ?,
                    price = ?`

  let values = [];
  if (vacation.imageName === undefined) {
    sql += ` WHERE vacationID = ?`
    values = [vacation.destination, vacation.description, vacation.fromDate, vacation.untilDate, vacation.price, vacation.vacationID]
  } else {
    sql += `, imageName = ? WHERE vacationID = ?`
    values = [vacation.destination, vacation.description, vacation.fromDate, vacation.untilDate, vacation.price, vacation.imageName, vacation.vacationID]
  }

  const result: OkPacket = await dal.execute(sql, values);

  if (result.affectedRows === 0) throw new IdNotFoundError(vacation.vacationID);

  return vacation;
}

//* Delete vacation:
async function deleteVacation(id: number): Promise<void> {
  const sql = `DELETE FROM vacations
                    WHERE vacationID = ?`;

  const result: OkPacket = await dal.execute(sql, id);

  if (result.affectedRows === 0) throw new IdNotFoundError(id);
}

//* Follow:
async function followAsync(follower: FollowerModel): Promise<FollowerModel> {
  const error = follower.validate();
  if (error) throw new ValidationError(error);

  const sql = `INSERT INTO followers VALUES(?, ?)`;

  const result: OkPacket = await dal.execute(sql, [
    follower.userID,
    follower.vacationID,
  ]);

  return follower;
}

//* Unfollow:
async function unFollowAsync(follower: FollowerModel): Promise<void> {
  const sql = `DELETE FROM followers WHERE userID = ? AND vacationID = ?`;

  const result: OkPacket = await dal.execute(sql, [follower.userID, follower.vacationID]);

  if (result.affectedRows === 0) throw new IdNotFoundError(follower.userID || follower.vacationID);
}

export default {
  getAllVacations,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation,
  followAsync,
  unFollowAsync,
};
