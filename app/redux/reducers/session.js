import * as t from '../constants/ActionTypes';

const initialState = { token: '', ecode: 0, invalid: false, user: {}, sys_permissions: [] };

export default function session(state = initialState, action) {
  switch (action.type) {
    case t.SESSION_CREATE:
      return { ...state, loading: true, invalid: false };

    case t.SESSION_CREATE_SUCCESS:
      return { ...state, loading: false, ecode: action.result.ecode, user: action.result.data && action.result.data.user };

    case t.SESSION_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.SESSION_GET:
      return { ...state, loading: true };

    case t.SESSION_GET_SUCCESS:
      return { ...state, loading: false, ecode: action.result.ecode, user: action.result.data && action.result.data.user };

    case t.SESSION_GET_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.SESSION_DESTROY:
      return { ...state, loading: true };

    case t.SESSION_DESTROY_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.user = {};
        state.sys_permissions = [];
      }
      return { ...state, ecode: action.result.ecode };

    case t.SESSION_DESTROY_FAIL:
      return { ...state, error: action.error };

    case t.SESSION_INVALIDATE:
      return { ...state, invalid: true };

    default:
      return state;
  }
}
