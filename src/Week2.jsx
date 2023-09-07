import { useState, useEffect } from 'react'
import { Container } from '@mui/material/'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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
  const [qtyCount, setQtyCount] = useState()

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

  const handleQtyChange = (itemId, newQty) => {
    setMyCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === itemId) {
          return { ...item, qty: newQty }
        }
        return item
      })
      return updatedCart
    })
  }

  useEffect(() => {
    setOrder(prevOrder => prevOrder.slice().sort((a, b) => b.id - a.id))
  }, [order])

  const qtyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper'
  }

  return (
    <>
      <Container
        sx={{
          backgroundColor: '#f8f8f8',
          padding: '30px',
          borderRadius: '10px'
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 5, sm: 5, md: 5 }}>
          <Grid item xs={4}>
            <h1>Menu</h1>
            <Box
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                padding: '10px'
              }}
            >
              {data.map((product, idx) => (
                <Box
                  sx={{ my: 3, mx: 2 }}
                  key={product.id}
                  onClick={event => {
                    event.stopPropagation() // 阻止事件冒泡
                    setMyCart(drinksList => {
                      const isNewDrinksIdx = drinksList.findIndex(
                        item => item.id === product.id
                      )
                      if (isNewDrinksIdx === -1) {
                        const newDrink = { ...product, qty: 1 }
                        return [...drinksList, newDrink]
                      } else {
                        const updatedDrinks = [...drinksList]
                        updatedDrinks[isNewDrinksIdx].qty++
                        return updatedDrinks
                      }
                    })
                  }}
                >
                  <Grid container alignItems='center'>
                    <Grid item xs>
                      <Typography gutterBottom variant='h5' component='div'>
                        {product.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant='h6' component='div'>
                        ${product.price}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='middle' />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <div className='cart'>
              <h1>Shopping Cart</h1>

              {myCart.length > 0 ? (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{ marginBottom: '20px' }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell align='right'>Qty</TableCell>
                          <TableCell align='right'>Unit</TableCell>
                          <TableCell align='right'>Sum</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myCart.map(item => (
                          <TableRow
                            key={item.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {item.name}
                            </TableCell>
                            <TableCell align='right'>
                              {/* <Select
                                labelId='demo-select-small-label'
                                id='demo-select-small'
                                value={item.qty}
                                label='Age'
                                onChange={e =>
                                  handleQtyChange(item.id, e.target.value)
                                }
                              >
                                {qtyList.map(num => (
                                  <MenuItem
                                    value={num}
                                    selected={item.qty === num}
                                  >
                                    {num}
                                  </MenuItem>
                                ))}
                              </Select> */}
                              {item.qty}
                            </TableCell>
                            <TableCell align='right'>{item.price}</TableCell>
                            <TableCell align='right'>
                              {item.price * item.qty}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell align='right' colSpan={2}>
                            Total
                          </TableCell>
                          <TableCell align='right'>
                            {calculateTotal()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 5, sm: 5, md: 5 }}
                  >
                    <Grid item xs={2}>
                      <p>Note</p>
                    </Grid>
                    <Grid item xs={10}>
                      <textarea
                        cols='30'
                        rows='10'
                        onChange={event => setRemark(event.target.value)}
                      ></textarea>

                      <Stack
                        spacing={10}
                        direction='row'
                        sx={{ float: 'right', marginTop: '20px' }}
                      >
                        <Button
                          onClick={handleOrder}
                          variant='contained'
                          startIcon={<AddShoppingCartIcon />}
                        >
                          CheckOut
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <div className='content'>
                  <p>購物車內尚未有任何商品</p>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='cart'>
              <h2>Order List</h2>

              {order.length > 0 ? (
                <>
                  {order
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map(orderItem => (
                      <>
                        <h3>Order ID: {orderItem.id}</h3>
                        <TableContainer
                          component={Paper}
                          sx={{ marginBottom: '20px' }}
                          key={orderItem.id}
                        >
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label='simple table'
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align='right'>Qty</TableCell>
                                <TableCell align='right'>Sum</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {orderItem.products.map(product => (
                                <TableRow
                                  key={product.name}
                                  sx={{
                                    '&:last-child td, &:last-child th': {
                                      border: 0
                                    }
                                  }}
                                >
                                  <TableCell component='th' scope='row'>
                                    {product.name}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {product.qty}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {product.subTotal}
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell rowSpan={2} />
                                <TableCell align='right' colSpan={1}>
                                  Total
                                </TableCell>
                                <TableCell align='right'>
                                  {orderItem.total}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <p>備註: {orderItem.remark}</p>
                      </>
                    ))}
                </>
              ) : (
                <div className='content'>
                  <p>尚未有任何訂單</p>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Week2
