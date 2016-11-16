export const SESSION_LOG_IN = 'SESSION_LOG_IN';
export const SESSION_LOG_OUT = 'SESSION_LOG_OUT';
export const SESSION_SAVE_TOKEN = 'SESSION_SAVE_TOKEN';
export const SESSION_DELETE_TOKEN = 'SESSION_DELETE_TOKEN';


export const logIn = email, password => {
  return {
    type: SESSION_LOG_IN,
    token,
  };
};

export const logOut = () => {
  return {
    type: SESSION_LOG_OUT,
  };
};

export const saveToken = token => {
  return {
    type: SESSION_SAVE_TOKEN,
  };
}

export const deleteToken = () => {
  return { type: SESSION_DELETE_TOKEN };
}
