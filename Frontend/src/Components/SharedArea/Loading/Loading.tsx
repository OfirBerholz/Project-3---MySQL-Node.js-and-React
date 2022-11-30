import "./Loading.css";
import loadingImage from "../../../Assets/Images/Loading.gif"

function Loading(): JSX.Element {
    return (
        <div className="Loading">
			<img src={loadingImage} alt="Loading..." />
        </div>
    );
}

export default Loading;
