import Joi from "joi";

class FollowerModel {
    public userID: number;
    public vacationID: number;

    public constructor(follower: FollowerModel) {
        this.userID = follower.userID;
        this.vacationID = follower.vacationID;
    }

    private static validationSchema = Joi.object({
        userID: Joi.number().optional().positive().integer(),
        vacationID: Joi.number().optional().positive().integer(),
    });

    public validate(): string {
        const result = FollowerModel.validationSchema.validate(this);
        return result.error?.message;
    };

};

export default FollowerModel;