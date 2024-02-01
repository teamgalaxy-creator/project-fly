import React, { useEffect, useState } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '~/redux/reducers';
import { useDispatch } from '~/redux/store';
import { fetchAndStoreUserID } from '~/utility/utils';

const AuthRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const userID: string = useSelector((state: any) => state.MapReducers.userID);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = await fetchAndStoreUserID(dispatch);
      setIsAuthenticated(!!userId); // Update state based on whether the user is authenticated
    };

    if (!userID) {
      checkAuthentication();
      console.log('fetched from supabase');
    } else {
      setIsAuthenticated(!!userID);
    }
  }, []);

  if (isAuthenticated === null) {
    // Loading state, you might want to render a loading indicator here
    return null;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
