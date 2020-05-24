import { Reducer } from 'redux';
import { AppActions } from '../actions/appActions';

export interface AppState {
  sectionTitle: string;
  menuOpen: boolean;
}

export const initialState: AppState = {
  sectionTitle: '',
  menuOpen: false
};

const appReducer: Reducer<AppState, AppActions> = (
  state: AppState = initialState,
  action: AppActions
): any => {
  switch (action.type) {
    case 'APP_SECTION_TITLE':
      return {
        ...state,
        sectionTitle: action.title
      };
    case 'APP_MENU_OPEN':
      return {
        ...state,
        menuOpen: action.menuOpen
      };
    default:
      return state;
  }
};

export default appReducer;
