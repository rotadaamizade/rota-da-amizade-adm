import './login.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useContext, useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logged, setLogged } = useContext(UserContext);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    async function handleSignIn(e) {
        e.preventDefault();
        await signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        if (user) {
            setLogged({ status: true });
        }
    }, [user, setLogged]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className='login-container'>
        <div className="login-div">
            <h2>Bem vindo à área administrativa!</h2>
            <h1>Digite seus dados para continuar</h1>
            <form onSubmit={handleSignIn} action="">
                <input
                    placeholder='Usuário:'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                />
                <input
                    placeholder='Senha:'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
        </div>
    );
}

export default Login;
