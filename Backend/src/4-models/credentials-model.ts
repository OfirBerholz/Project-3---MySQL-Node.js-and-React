import Joi from "joi";

class CredentialsModel {
    public username: string;
    public password: string;

    constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    private static validationSchema = Joi.object({
        username: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(4).max(256)
    });

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    };
}

export default CredentialsModel;