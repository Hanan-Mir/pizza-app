function OrderConfirmModal({state,dispatch,setOrderConfirmPopup}) {
    const itemsPresentInCart=state.cart.length>0;
    function calculateTotalPrice(){
        if(itemsPresentInCart){
           const totalAmount= state.cart.reduce((acc,curItem)=>{
                return acc+curItem.quantity*curItem.price
            },0)
            return totalAmount.toFixed(2);
        }
    }
    function handleNewOrder(){
        setOrderConfirmPopup(false)
        dispatch({type:'reset'})
    }
    return (
        <div className="bg-white px-4 rounded-3xl py-10 fixed z-20  top-[14%] left-[0%] h-[90vh] w-[100%] md:w-[45%] md:left-[28%] md:top-[6%]">
            <div>
                <img src="./assets/images/icon-order-confirmed.svg" />
                <h1 className="text-[3.4rem] font-black">Order Confirmed</h1>
                <p className="text-gray-500 text-[1.2rem]">we hope you enjoy your food!</p>
                <div className="mt-6 bg-blue-200 px-6 py-4 rounded-2xl">
                   {state.cart.map((el)=>{
                    return( <div className="flex justify-between  mt-2 border-b-1 border-b-gray-400">
                        
                        <div className="flex gap-2">
                            <img src={el.image.thumbnail} className="h-[70%]" />
                            <div>
                            <p className="font-semibold">{el.name}</p>
                            <div className="flex gap-6 mt-1">
                            <span className="text-red-700">{el.quantity}x</span>
                            <span className="text-gray-500">@${(el.price).toFixed(2)}</span>
                            </div>
                            </div>
                            
                            </div>
                            <div>
                            <p className="text-2xl">${((el.quantity)*(el.price)).toFixed(2)}</p>
                                </div>
                        </div>
                    )
                   })}
                     <div className="mt-4 flex justify-between">
                    <p className="text-gray-500">Order Total</p>
                    <p className="font-black text-2xl">${calculateTotalPrice()}</p>
                   
                </div>
                </div>
                <div  className="flex justify-center mt-8">
              <button onClick={()=>handleNewOrder()} className="bg-red-600 px-27 py-6 rounded-full text-white font-bold">
                Start New Order
              </button>
</div>
            </div>
        </div>
    )
}

export default OrderConfirmModal
