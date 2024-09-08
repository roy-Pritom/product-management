import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token } = useAppSelector((state: RootState) => state.auth);
    if (!token) {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
};

export default ProtectedRoute;