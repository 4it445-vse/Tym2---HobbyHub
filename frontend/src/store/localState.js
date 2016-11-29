export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) { return undefined; }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export function saveState(state) {
  console.log('SAVE STATE DATA',state);
  try {
    const serializedState = JSON.stringify(state);
    console.log('saveStateData', serializedState)
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log('saveStateError', error);
  }
}
