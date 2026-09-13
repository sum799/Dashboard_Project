import { documentationPath } from 'lib/constants';

export const rootPaths = {
  root: '/',
  authRoot: 'auth',
};

// File header: Central route path constants. Use these constants instead of
// hard-coding path strings to avoid drift across components.
const paths = {
  root: rootPaths.root,
  starter: `/starter`,
  users: `/users`,
  account: `/account`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  notifications: `/notifications`,
  documentation: documentationPath,

  404: `/404`,
};

export default paths;
