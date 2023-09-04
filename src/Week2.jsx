import { useState, useEffect } from 'react'
import { Container } from '@mui/material/'

const drinks = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60
  }
]

function Week2 () {
  const [data, setData] = useState(drinks)
  const [myCart, setMyCart] = useState([])
  const [order, setOrder] = useState([])
  const [remark, setRemark] = useState('')

  const handleOrder = () => {
    if (myCart.length === 0) return

    const total = calculateTotal() // 計算總計金額

    setOrder(prev => [
      ...prev,
      {
        id: new Date().getTime(), // 使用時間戳作為 ID
        products: myCart.map(item => ({
          name: item.name,
          qty: item.qty,
          subTotal: item.price * item.qty
        })),
        remark,
        total // 使用計算出的總計金額
      }
    ])

    // 清空購物車
    setMyCart([])
  }

  const calculateTotal = () => {
    return myCart.reduce((total, item) => total + item.price * item.qty, 0)
  }

  useEffect(() => {
    setOrder(prevOrder => prevOrder.slice().sort((a, b) => b.id - a.id))
  }, [order])

  return (
    <>
      <Container>
        <h1>點餐系統</h1>

        <div className='sidebar'>
          {/* 點選品項加入購物車 */}
          {data.map((product, idx) => (
            <div
              key={product.id}
              onClick={() =>
                setMyCart(drinksList => {
                  const isNewDrinksIdx = drinksList.findIndex(
                    item => item.id === product.id
                  )
                  if (isNewDrinksIdx === -1) {
                    const newDrink = { ...product, qty: 1 } // 新品項，初始化 qty 為 1
                    return [...drinksList, newDrink] // 將新品項加到陣列末尾
                  } else {
                    const updatedDrinks = [...drinksList] // 複製陣列以避免直接修改
                    updatedDrinks[isNewDrinksIdx].qty++ // 更新數量
                    return updatedDrinks
                  }
                })
              }
            >
              {product.name},{product.price}
            </div>
          ))}

          {/* 顯示購物車內容 */}
          <div className='cart'>
            <h2>Shopping Cart</h2>

            {myCart.length > 0 ? (
              <>
                <ul>
                  {myCart.map(item => (
                    <li key={item.id}>
                      {item.name} x {item.qty}，單價：{item.price}，小計:
                      {item.price * item.qty}
                    </li>
                  ))}
                </ul>
                <p>總計: {calculateTotal()}</p>
                <textarea
                  name=''
                  id=''
                  cols='30'
                  rows='10'
                  placeholder='備註'
                  onChange={event => setRemark(event.target.value)}
                ></textarea>
                <button onClick={handleOrder}>Submit</button>
              </>
            ) : (
              <div className='content'>
                <p>購物車內尚未有任何商品</p>
              </div>
            )}
          </div>

          {/* 顯示訂單內容 */}
          <div className='cart'>
            <h2>Order List</h2>

            {order.length > 0 ? (
              <>
                <ul>
                  {order
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map(orderItem => (
                      <li key={orderItem.id}>
                        <h3>Order ID: {orderItem.id}</h3>
                        <ul>
                          {orderItem.products.map(product => (
                            <li key={product.name}>
                              {product.name} x {product.qty}，小計：
                              {product.subTotal}
                            </li>
                          ))}
                        </ul>
                        <p>備註: {orderItem.remark}</p>
                        <p>總計：{orderItem.total}</p>
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <div className='content'>
                <p>尚未有任何訂單</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Week2
