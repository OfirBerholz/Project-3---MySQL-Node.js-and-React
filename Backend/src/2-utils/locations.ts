import path from "path";

const rootFolder = path.resolve(__dirname, "..", "..");

const vacationImagesFolder = path.join(rootFolder, "src", "1-assets", "images");
const notFoundImageFile = path.join(rootFolder, "src", "1-assets", "images", "not-found.jpg");

function getVacationImageFile(imageName) {
    if(!imageName) return null;
    return path.join(vacationImagesFolder, imageName);
};

export default {
    getVacationImageFile,
    notFoundImageFile
};