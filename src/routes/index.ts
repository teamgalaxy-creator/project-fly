const ROUTES = {
  LANDINGPAGE: {
    path: '/',
    key: 'LANDINGPAGE',
  },
  HOMEPAGE: {
    path: '/homepage',
    key: 'HOMEPAGE',
  },
  LOGIN: {
    path: '/login',
    key: 'LOGIN',
  },
  SIGNUP: {
    path: '/signup',
    key: 'SIGNUP',
  },
  HISTORY: {
    path: '/history',
    key: 'HISTORY',
  },
  PAYMENT: {
    path: '/payment',
    key: 'PAYMENT',
  },
  PAYMENTPLANS: {
    path: '/paymentPlans',
    key: 'PAYMENTPLANS',
  },
  VERIFICATION: {
    path: '/verification',
    key: 'VERIFICATION',
  },
  PASSWORDRESET: {
    path: '/passwordreset',
    key: 'PASSWORDRESET',
  },
  NEWPASSWORD: {
    path: '/newpassword',
    key: 'NEWPASSWORD',
  },
  SETTINGS: {
    path: '/settings',
    key: 'SETTINGS',
  },
  VIEWTRAVEL: {
    path: '/viewtravel',
    key: 'VIEWTRAVEL',
  },
} as const;

export type RouteKeys = keyof typeof ROUTES;
export default ROUTES;
