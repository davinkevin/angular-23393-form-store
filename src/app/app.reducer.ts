import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../environments/environment';
import {AppAction, AppActions} from './app.action';

export interface Team {
  name: string;
  members: Member[];
}

export interface Member {
  name: string;
  age: number;
}

export interface State {
  team: Team;
}

const initialState: Team = {
  name: 'A name',
  members: []
};

export function teamReducer(state: Team = initialState, action: AppActions): Team {
  switch (action.type) {
    case AppAction.FORM_UPDATE : {
      return { ...action.team };
    }

    case AppAction.ADD_NEW_MEMBER : {
      return { ...state, members: [...state.members, action.member]};
    }

    default: {
      return state;
    }

  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectTeamFeature = (state: State) => state.team;
export const members = createSelector(selectTeamFeature, (team: Team) => team.members);
