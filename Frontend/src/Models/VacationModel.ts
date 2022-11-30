class VacationModel {
    public vacationID?: number;
    public destination: string;
    public description: string;
    public image: FileList
    public imageName: string;
    public fromDate: Date;
    public untilDate: Date;
    public price: number;
    public isFollowing: number;
    public followersCount: number;
    public fromDateString: string;
    public untilDateString: string;
}

export default VacationModel