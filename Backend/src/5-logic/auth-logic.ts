import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import hash from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

//* Add New User:
async function register(user: UserModel): Promise<string> {
  // <-- "string" because returning a new token

    user.password = hash(user.password);

  // Validate:
  const error = user.validate();
  if (error) throw new ValidationError(error);

  // Create minimum role:
  user.roleID = RoleModel.User;

  const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

  const result: OkPacket = await dal.execute(sql, [user.firstName,user.lastName,user.username,user.password,user.roleID + 1]);

  user.roleID = RoleModel.User+1;

  user.userID = result.insertId;

  //Delete password:
  delete user.password;

  // Generate new token:
  const token = auth.generateNewToken(user);

  return token;
}

//* Login:
async function login(credentials: CredentialsModel): Promise<string> {
  // Validate:

  credentials.password = hash(credentials.password);

  const error = credentials.validate();
  if (error) throw new ValidationError(error);

  const sql = `SELECT
                *
                FROM users
                WHERE username = ? AND password = ?`;

                // JOIN roles ON
                // users.roleID = roles.roleID

  // Get users from file:
  const users = await dal.execute(sql, [credentials.username, credentials.password]);

  const user = users[0];

  // If no such user exists:
  if (!user) throw new UnauthorizedError("Incorrect username or password");

  //Delete password:
  delete user.password;

  // Generate new token:
  const token = auth.generateNewToken(user);

  return token;
}

//* Check if the username is taken:
async function usernameIsTaken(username: string): Promise<boolean> {
    
    const sql = `SELECT
                    1 FROM users
                    WHERE username = ?`;
    const users = await dal.execute(sql, username);
    
    if(users.length > 0) {
        return true
    } else {
        return false
    };
}

export default {
  register,
  login,
  usernameIsTaken
};
