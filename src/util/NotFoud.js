import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function NotFoud(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate('../');
    }, [navigate])
}