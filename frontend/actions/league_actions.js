import * as LeagueAPIUtil from '../util/league_api_util';

export const RECEIVE_LEAGUE = "RECEIVE_LEAGUE";
export const DELETE_LEAGUE = "DELETE_LEAGUE";
export const RECEIVE_LEAGUES = "RECEIVE_LEAGUES";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"

export const receiveLeague = payload => ({
  type: RECEIVE_LEAGUE,
  payload
})

export const removeLeague = leagueId => ({
  type: DELETE_LEAGUE,
  leagueId
})

export const receiveLeagues = payload => ({
  type: RECEIVE_LEAGUES,
  payload
})

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const createLeague = league => dispatch => (
  LeagueAPIUtil.createLeague(league).then(league => (
    dispatch(receiveLeague(league))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const deleteLeague = id => dispatch => (
  LeagueAPIUtil.deleteLeague(id).then(commissioner => (
    dispatch(removeLeague(commissioner))
  ))
)

export const fetchLeagues = () => dispatch => (
  LeagueAPIUtil.fetchLeagues().then(payload => (
    dispatch(receiveLeagues(payload))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);