import fetch from 'isomorphic-fetch';
import { getPetsIfNeeded } from './pet';

export const REQUEST_MATCH = 'REQUEST_MATCH';
export const FINISHED_MATCH = 'FINISHED_MATCH';
export const ERROR_MATCH = 'ERROR_MATCH';

function requestMatch(id){
	return{
		type: REQUEST_MATCH,
		id
	};
}

function errorMatch(error){
	return{
		type: ERROR_MATCH,
		error: error
	};
}

function finishedMatch(match){
	return{
		type: FINISHED_MATCH,
		match:match
	};
}

export function getMatch(id){
	return (dispatch,getState) =>{
		dispatch(requestMatch(id));
		return fetch(`/api/pet/${id}/match`)
			.then( response => response.json())
			.then( json => finishedMatch(json))
			.catch(error => errorMatch(error))
	}
}


export function getPetsAndDefaultMatch(){
	return (dispatch,getState) =>{
		console.log("STATE ++++ " ,getState());
		(getPetsIfNeeded()(dispatch, getState) || Promise.resolve())
			.then(() => dispatch(getMatch(getState().pets[0].id)));
	}
}

