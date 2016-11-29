export const DUMMY_ACTION = 'DUMMY_ACTION';
export const USER_LOGGED = 'USER_LOGGED';
export const IS_USER_LOGGED = 'IS_USER_LOGGED';
export const USER_SESSION = 'USER_SESSION';
export const GET_SESSION = 'GET_SESSION';

export const dummyAction = data => {
  return {
    type: DUMMY_ACTION,
    data,
    hello: [1, 2, 3],
    world: "!",
  };
};

export const loginAction = (authToken, userId) => {
  return {
    type: 'LOGIN',
    authToken,
    userId
  }
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
  }
}

export const isUserLogged = () => {
  return {
    type: IS_USER_LOGGED
  };
};

export const userLogged = boolean => {
  return {
    type: USER_LOGGED,
    payload: boolean,
  };
};

// můžeme smazat?
export const userSession = (id, customerId) => {
  return {
    type: USER_SESSION,
    payload: {id: id, customerId: customerId}
  };
};

// můžeme smazat?
export const getSession = () => {
  return {
    type: GET_SESSION
  };
};
