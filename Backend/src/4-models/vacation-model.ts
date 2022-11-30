import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public vacationID: number;
    public destination: string;
    public description: string;
    public image: UploadedFile
    public imageName: string;
    public fromDate: Date;
    public untilDate: Date;
    public price: number;
    public isFollowing: number;
    public followersCount: number;

    public constructor(vacation: VacationModel) {
        this.vacationID = vacation.vacationID;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;
    };

    private static validationSchema = Joi.object({
        vacationID: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(550),
        image: Joi.object().optional(),
        imageName: Joi.string().optional().max(150),
        fromDate: Joi.date().greater('now').required().iso(),
        untilDate: Joi.date().greater(Joi.ref('fromDate')).required().iso(),
        price: Joi.number().required().positive(),
        isFollowing: Joi.number().optional().positive(),
        followersCount: Joi.number().optional().positive()
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    };
}

export default VacationModel;