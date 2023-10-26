import { useContext } from 'react';
import './header.css';
import { UserContext } from '../../UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const { logged, setLogged } = useContext(UserContext);

    const logOut = () => {
        setLogged({ status: false });
        navigate('/login');
    }

    return (
        <header>
            <div>
                <Link to={'/'}>Rota da Amizade ADMIN</Link>
                {logged.status && <button onClick={logOut}>Sair</button>}
                
            </div>
        </header>
    )
}

export default Header;
