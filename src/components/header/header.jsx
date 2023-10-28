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
                <Link className='header-title' to={'/'}>Rota da Amizade ADM</Link>
                {logged.status && <button  className='header-button' onClick={logOut}>Sair</button>}
                
            </div>
        </header>
    )
}

export default Header;
