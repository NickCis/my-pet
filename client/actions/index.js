import { changeProfileTab } from './profile';

export const CHANGE_PAGE = 'CHANGE_PAGE';

function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  };
}

export function changePageIfNeeded(page) {
  return (dispatch, getState) => {
    const [ pageName, subPage ] = page.split('/');
    switch(pageName){
      case 'Profile':
        if(subPage)
          dispatch(changeProfileTab(subPage));
    }

    if(getState().page != pageName)
      return dispatch(changePage(pageName));
  };
}
