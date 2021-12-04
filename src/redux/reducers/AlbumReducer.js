let defaultState= {
    albums:[],
    error:false
}

let albumReducer=(state=defaultState,action)=>{
    switch(action.type){
        case 'FETCH_ALBUM_SUCCESS':{
            let newState ={...state} 
            newState.albums=action.payload

            // if(action.payload.checkboxValue){
            //     // console.warn("ADD TO CART")
              
            //     newState.selectedItems={
            //         items:[...newState.selectedItems.items,action.payload],
            //         restaurantName:action.payload.restaurantName
            //         }
            // }else{
            //     // console.warn("REMOVE TO CART")
            //     newState.selectedItems={
            //         items:[...newState.selectedItems.items.filter((item)=> item.title !== action.payload.title)],
            //         restaurantName:action.payload.restaurantName
            //     }

            // }
            // console.warn('The sate is', newState)
             return newState
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