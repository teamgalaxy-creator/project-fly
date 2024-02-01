// PrivateRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTES from '../index';
import HistoryPageContainer from '~/containers/HistoryContainer';
import MainPageUi from '~/components/MainPageUi';

import PaymentStatsContainer from '~/containers/PaymentStatsContainer';
import PaymentPlansContainer from '~/containers/PaymentPlansContainer';
import SettingsPageContainer from '~/containers/SettingsPageContainer';
import { AuthProvider } from '~/managers/AuthContext';
import Login from '~/components/Login/Login';
import AuthRoute from '../AuthRoute';
import Signup from '~/components/Signup/Signup';
import Verify from '~/components/EmailConfirmation';
import PasswordReset from '~/components/PasswordReset';
import NewPassword from '~/components/PasswordReset';
import ViewTravel from '~/components/ViewTravel';
import LandingPage from '~/components/LandingPage/LandingPage';

export function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ROUTES.LOGIN.path} element={<Login />} />
        <Route path={ROUTES.SIGNUP.path} element={<Signup />} />
        <Route path={ROUTES.LANDINGPAGE.path} element={<LandingPage />} />
        <Route path={ROUTES.VERIFICATION.path} element={<Verify />} />
        <Route path={ROUTES.PASSWORDRESET.path} element={<PasswordReset />} />
        <Route path={ROUTES.NEWPASSWORD.path} element={<NewPassword />} />
        <Route path={`${ROUTES.VIEWTRAVEL.path}`} element={<ViewTravel />} />

        {/* <Route element={<AuthRoute />}> */}
        <Route>
          <Route path={ROUTES.HOMEPAGE.path} element={<MainPageUi />} />
          <Route
            path={ROUTES.HISTORY.path}
            element={<HistoryPageContainer />}
          />
          <Route
            path={ROUTES.SETTINGS.path}
            element={<SettingsPageContainer />}
          />
          <Route
            path={ROUTES.PAYMENT.path}
            element={<PaymentStatsContainer />}
          />
          <Route
            path={ROUTES.PAYMENTPLANS.path}
            element={<PaymentPlansContainer />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
