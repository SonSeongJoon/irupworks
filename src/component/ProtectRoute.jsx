import React from 'react';
import {useAuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

export default function ProtectRoute({children}) {
	const {user, isLoading} = useAuthContext();

	if (isLoading) {
		return null;
	}

	if (!user) {
		return <Navigate to='/login' replace={true}/>;
	}

	return children;
}
