import "./Footer.css";

function Footer(): JSX.Element {

    const year = new Date().getFullYear()

    return (
        <div className="Footer">
			<h5>Ofir Berholz Project {year} ©</h5>
        </div>
    );
}

export default Footer;
