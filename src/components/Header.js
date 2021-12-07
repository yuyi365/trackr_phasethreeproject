import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Link to="/">
                <Icon name="home" size="huge"/>
            </Link>
            
        </div>
    )
}

export default Header
