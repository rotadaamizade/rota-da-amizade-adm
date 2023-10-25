import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectToLogin(){
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/login')
    }, [])

    return
}

export default RedirectToLogin