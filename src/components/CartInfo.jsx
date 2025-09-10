function CartInfo({state,dispatch,setOrderConfirmPopup}) {
    const itemsPresentInCart=state?.cart.length>0;
    function calculateTotalPrice(){
        if(itemsPresentInCart){
           const totalAmount= state.cart.reduce((acc,curItem)=>{
                return acc+curItem.quantity*curItem.price
            },0)
            return totalAmount.toFixed(2);
        }
    }
    function handleRemoveItemFromCart(item){
        dispatch({type:'removeItemFromCart',payLoad:item})
    }
    function handleViewModal(){
        setOrderConfirmPopup(true);
    }
    return (
        <div className="w-[100%] h-[45vh] bg-white px-5 py-8 rounded-2xl overflow-auto md:w-[30%] md:fixed md:top-[10%] md:right-[2%]">
            <h1 className="text-red-700 font-extrabold text-2xl">Your Cart ({state?.cart.length?state.cart.length:'0'})</h1>
          {!itemsPresentInCart ?  <div className="w-[100%] flex flex-col justify-center items-center mt-5">
                <img src="./assets/images/illustration-empty-cart.svg" className="w-[40%]" />
                <p className="mt-4 text-gray-400">Your added items will appear here</p>

            </div>:<>
            <ul>
                {state?.cart.map((el)=>{
                   return <li className="flex justify-between mt-4 border-b-1 py-3 border-b-gray-700">
                        <div className="w-[70%]">
                    <h3 className="font-extrabold text-[1.2rem]">{el.name}</h3>
                    <div className="flex justify-start gap-4">
                        <span className="text-red-900 font-semibold text-[1.2rem]">{el.quantity}x</span>
                        <span className="text-gray-500 text-[1.2rem]">@{(el.price).toFixed(2)}</span>
                        <span className="text-[1.2rem] text-gray-900">${(el.price*(el.quantity)).toFixed(2)}</span>
                    </div>
                        </div>
                        <div>
                        <img onClick={()=>handleRemoveItemFromCart(el)} src="./assets/images/icon-remove-item.svg" className="border-2 border-gray-600 p-1 rounded-full h-6 w-6" />
                        </div>
                    </li>
                })}
                
                </ul>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-1xl font-bold">Order Total</p>
                    <span className="font-bold text-3xl">${calculateTotalPrice()}</span>
                </div>
                <div className="flex justify-center items-center mt-4 bg-blue-300 py-3 rounded-md ">
                    <img src="./assets/images/icon-carbon-neutral.svg" className="h-6" />
                    <p className="ml-3 text-[1rem]">This is a <strong>carbon-neutral</strong> delivery</p>
                </div>
                <div className="flex justify-center mt-6">
                <button onClick={()=>handleViewModal()} className="bg-red-600 px-28 py-5 rounded-full text-white font-semibold text-[1rem]">
                    Confirm Order
                </button>
                </div>
                </>}
            
        </div>
    )
}

export default CartInfo
