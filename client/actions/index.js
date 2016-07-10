export const CHANGE_PAGE = 'CHANGE_PAGE';

function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  };
}

export function changePageIfNeeded(page) {
  return (dispatch, getState) => {
    if(getState().page != page.name)
      return dispatch(changePage(page));
  };
}
