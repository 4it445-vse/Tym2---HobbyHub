export const DUMMY_ACTION = 'DUMMY_ACTION';

export const dummyAction = data => {
  return {
    type: DUMMY_ACTION,
    data,
    hello: [1, 2, 3],
    world: "!",
  };
};
