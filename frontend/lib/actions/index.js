export const DUMMY_ACTION = 'DUMMY_ACTION';
export const USER_LOGGED = 'USER_LOGGED';
export const IS_USER_LOGGED = 'IS_USER_LOGGED';

export const dummyAction = data => {
  return {
    type: DUMMY_ACTION,
    data,
    hello: [1, 2, 3],
    world: "!"
  };
};

export const isUserLogged = () => {
  return {
    type: IS_USER_LOGGED
  };
};

export const userLogged = boolean => {
  return {
    type: USER_LOGGED,
    payload: boolean
  };
};