import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes() {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}
