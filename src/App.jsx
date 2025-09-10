import { useEffect, useReducer, useState } from "react"
import PizzaCard from "./components/PizzaCard";
import CartInfo from "./components/CartInfo";
import OrderConfirmModal from "./components/OrderConfirmModal";

function reducer(state,action){
switch(action.type){
case 'reset':{
  return {cart:[]}
}
  case 'removeItemFromCart':
    return {...state,cart:state?.cart.filter(el=>el.name!==action.payLoad.name)}

    case 'addToCart':
        return {...state,cart:[...state.cart,{...action.payLoad,quantity:1}]}
     
    case 'increase':
      console.log(state)
     return {
      ...state,cart:state.cart.map((el)=>{
       return el.name===action.payLoad.name?{...el,quantity:el.quantity+1}:el
      })
     }
     case 'decrease':{
    const itemIndex=state.cart.findIndex(el=>el.name===action.payLoad.name);
    if(itemIndex===-1) return {...state};
    if(state.cart[itemIndex].quantity<=1){
      return {...state,cart:state.cart.filter(el=>el.name!==state.cart[itemIndex].name)}
    }else{

    
      return {
        ...state,cart:state.cart.map(el=>{
        
          return el.name===action.payLoad.name?{...el,quantity:el.quantity-1}:el
        })
      }
    }
    }
}
}

function App() {
  const [pizzaData,setPizzaData]=useState();
  const [state,dispatch]=useReducer(reducer,{cart:[]});
  const [orderConfirmPopup,setOrderConfirmPopup]=useState(false);
  useEffect(function(){
    async function getPizzaData(){
      try{
const fetchData=await fetch('/data.json');

const response =await fetchData.json();
if(!fetchData.ok) throw new Error('Error in fetching the data')
setPizzaData(response)
}catch(error){
  alert(error)
}
    }
getPizzaData();
  },[]);
  
  return (
<div className={`w-[100%] h-[100vh] flex justify-center relative md:relative `}>
<div className={`w-[80%] h-[100vh] mt-5 py-10 ${orderConfirmPopup && 'fixed opacity-40 z-4'}`}>
    <h1 className="font-extrabold text-4xl">Desserts</h1>
    <div className="mt-10 md:grid md:grid-cols-3 md:gap-4 md:w-[70%]">
    {pizzaData?.map((el)=>{
      return <PizzaCard state={state} data={el} dispatch={dispatch} key={el.name}  />
    })}
    </div>
     <CartInfo state={state} dispatch={dispatch} setOrderConfirmPopup={setOrderConfirmPopup} />


    </div>
   {orderConfirmPopup &&<OrderConfirmModal state={state} dispatch={dispatch} setOrderConfirmPopup={setOrderConfirmPopup} />}
    </div>
  )
}

export default App
