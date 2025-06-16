import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Ejemplo: ['ADMIN']
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getCurrentUser()
      .then(user => {
        if (isMounted) setAuthorized(allowedRoles.includes(user.rol));
      })
      .catch(() => {
        if (isMounted) setAuthorized(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [allowedRoles]);

  if (loading) return <div>Cargando...</div>;
  if (!authorized) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PrivateRoute;