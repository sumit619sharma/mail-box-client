import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sendMails: {},
    getMails: {},
    unread: 0,
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
     fromMail(state,action){
   // var upstate = state
        state.expenseItem[action.payload.id]=action.payload;
        state.expenseTotal =Number( state.expenseTotal)+Number(action.payload.price)
 
     },removeMail(state,action){
        if(Object.keys(state.getMails).length==0) return state;
        console.log("removeExpense==", action.payload.id);
          
        delete state.getMails[action.payload.id];
        
     },updateMail(state,action){
       console.log('currAction', action.payload)
       console.log('currItem', state.expenseItem[action.payload.id])
        // state.expenseTotal = Number(state.expenseTotal)-  Number(state.expenseItem[action.payload.id].price);
        // state.expenseTotal = Number(state.expenseTotal)+  Number(action.payload.item.price);
        
      const passItem= {...action.payload.item,id: action.payload.id}
        state.expenseItem[ action.payload.id]=passItem;
     },
     resetGetMail(state,action){
    if(action.payload==null || action.payload==undefined) return;
      state.getMails= action.payload;
      const mailObj = action.payload;
      let unreadCnt =0;
      Object.keys(mailObj).forEach((key)=>{
        if( mailObj[key].read==false){
          unreadCnt++;
        }
      })
      state.unread =unreadCnt; 
     },
     decreaseUnread(state){
      state.unread = state.unread -1;
     },defaultState(state){
    state=initialState;
     },
     resetSendMail(state,action){
      if(action.payload==null || action.payload==undefined) return;
      state.sendMails= action.payload;
     },
     removeSendMail(state,action){
      if(Object.keys(state.sendMails).length==0) return state;
      console.log("removeExpense==", action.payload.id);
        
      delete state.sendMails[action.payload.id];   
      
   }

    }
})

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;