import { Action } from 'redux';

export interface SectionTitle extends Action<'APP_SECTION_TITLE'> {
  title: string;
}

export interface MenuOpen extends Action<'APP_MENU_OPEN'> {
  menuOpen: boolean;
}

export type AppActions =
  SectionTitle |
  MenuOpen;

export const appSetSectionTitle = (title: string): SectionTitle => ({ type: 'APP_SECTION_TITLE', title });
export const appSetMenuOpen = (menuOpen: boolean): MenuOpen => ({ type: 'APP_MENU_OPEN', menuOpen });
