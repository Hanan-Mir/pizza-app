

function PizzaCard({data,state,dispatch}) {


function isItemPresentInCart(data){
   
return (state?.cart ||[]).some((el)=>el.name===data.name)
}
function currentQuantity(data){
   
let currentItem=state?.cart.find((el)=>el.name===data.name);
return currentItem.quantity
}
function handleIncrease(data){
   
dispatch({type:'increase', payLoad:data})
}
function handleDecrease(data){
dispatch({type:'decrease',payLoad:data})
}
function handleAddToCart(data){
    if(!isItemPresentInCart(data)){
dispatch({type:'addToCart',payLoad:data});
    }
}
    
    return (
        <div className={`mb-[10%]`}>
            <div className='relative'>
            <img src={data?.image.mobile} className="w-[100%] h-[35vh] rounded-xl md:h-[30vh]"  />
            <button className={`flex ${isItemPresentInCart(data)?'bg-red-600 min-w-[55%] md:min-w-[70%] px-4 justify-between text-white':'bg-white min-w-[55%] md:min-w-[70%] px-4  justify-center gap-2'}  border-1  py-3  items-center rounded-4xl absolute left-[24%] bottom-[-6%] md:left-[16%] `} onClick={()=>handleAddToCart(data)}>
              {!isItemPresentInCart(data) ?(<>
              <img src="./assets/images/icon-add-to-cart.svg" />
                <span className="ml-2">
                    Add to Cart

                </span>
                </>):(<>
                <span className="border-2 p-1 rounded-[50%]" onClick={()=>handleDecrease(data)}>
                <img src="./assets/images/icon-decrement-quantity.svg" className="h-4 w-4" />
                </span>
                <span className="text-2xl">{currentQuantity(data)}</span>
                <span  className="border-2 p-1 rounded-[50%]" onClick={()=>handleIncrease(data)}>
                <img src="./assets/images/icon-increment-quantity.svg" className="h-4 w-4" />
                </span>
                </>)
                }
                
                </button>
                </div>
                <div className="mt-8">
                
    
            <p className="text-gray-400 font-extralight">{data.category}</p>
            <p className="font-normal">{data.name}</p>
            <p className="text-red-900 font-semibold text-2xl">${(data.price).toFixed(2)}</p>
            </div>

        </div>
    )
}

export default PizzaCard
