let defaultState= {
    albums:[],
    nextPage: null,
    error:false
}

let albumReducer=(state=defaultState,action)=>{
    switch(action.type){
        case 'FETCH_ALBUM_SUCCESS':{
             //concatenate the new album with the old one. using the concat function instead of the dot operator because the dot operator will mutate the original array.
            return {
                ...state,
                albums:[...(state.albums || []), ...action.payload],
                error: false,
              };
        }
        
        case 'FETCH_NEXT_PAGE_SUCCESS':{
            //concatenate the new album with the old one. using the concat function instead of the dot operator because the dot operator will mutate the original array.
           return {
               ...state,
               albums:[...state.albums,action.payload],
               error: false,
             };
       }

        case 'FETCH_ALBUM_FAILURE':{
            let newState ={...state}
            newState.error=true
        }


        default:
            return state    
    }
}

export default albumReducer