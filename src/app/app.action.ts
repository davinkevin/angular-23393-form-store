import {Action} from '@ngrx/store';
import {Member, Team} from './app.reducer';

export enum AppAction {
  FORM_UPDATE = '[FORM] update the form by user interaction',
  ADD_NEW_MEMBER = '[FORM] add new member'
}

export class FormUpdateAction implements Action {
  readonly type = AppAction.FORM_UPDATE;
  constructor(public team: Team) {}
}

export class AddNewMemberAction implements Action {
  readonly type = AppAction.ADD_NEW_MEMBER;
  constructor(public member: Member) {}
}

export type AppActions
  = FormUpdateAction
  | AddNewMemberAction
  ;
