import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    public userID: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleID: RoleModel;

    public constructor(user: UserModel) {
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleID = user.roleID;
    }

    private static validationSchema = Joi.object({
        userID: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(256),
        roleID: Joi.number().optional().positive().integer()
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    };

};

export default UserModel;