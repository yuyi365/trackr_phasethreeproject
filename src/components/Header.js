import { Link } from "react-router-dom";

const Header = () => {
    return (
    <>
    <div className="header">
    <Link to="/">
        <span><h1 id="logo">Trackr</h1></span>
    </Link>
    </div>
    </>
    )
}

export default Header