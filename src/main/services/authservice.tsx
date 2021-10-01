import AppConstants from '../contants/appconstants';

let accessToken: unknown;
let refreshToken: unknown;
let currentUser: unknown;

function getAccessToken() {
  return accessToken;
}
function getRefreshToken() {
  return refreshToken;
}
function getCurrentUser() {
  return currentUser;
}

const login = async (email: string, password: string) => {
  const response = await fetch(AppConstants.LoginUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `grant_type=password&username=${email}&password=${password}&remember=true&socialaccount=false`,
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }
  accessToken = data.access_token;
  currentUser = data;
  refreshToken = data.refresh_token;
  return currentUser;
};
const refreshTokens = async () => {
  // const refreshToken = await keytar.getPassword(keytarService, keytarAccount);
  // if (refreshToken) {
  //   const refreshOptions = {
  //     method: 'POST',
  //     url: `https://${auth0Domain}/oauth/token`,
  //     headers: {'content-type': 'application/json'},
  //     data: {
  //       grant_type: 'refresh_token',
  //       client_id: clientId,
  //       refresh_token: refreshToken,
  //     }
  //   };
  //   try {
  //     const response = await axios(refreshOptions);
  //     accessToken = response.data.access_token;
  //     profile = jwtDecode(response.data.id_token);
  //   } catch (error) {
  //     await logout();
  //     throw error;
  //   }
  // } else {
  //   throw new Error("No available refresh token.");
  // }
};
async function logout() {
  accessToken = null;
  currentUser = null;
  refreshToken = null;
}
export {
  getAccessToken,
  getRefreshToken,
  getCurrentUser,
  login,
  refreshTokens,
  logout,
};
