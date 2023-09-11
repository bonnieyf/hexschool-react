import { useState } from 'react'
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Container
} from '@mui/material/'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import Fade from '@mui/material/Fade'

const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    count: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    count: 18
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    count: 34
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    count: 10
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    count: 25
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    count: 20
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    count: 18
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    count: 20
  }
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

function Week1 () {
  const [items, setItems] = useState(data)
  const [open, setOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const handleOpen = item => {
    setCurrentItem(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [show, setShow] = useState(false)

  const handleSave = () => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id !== currentItem.id) {
          return item
        }
        const updatedItem = {
          ...item,
          name: currentItem.name,
          description: currentItem.description,
          price: parseInt(currentItem.price),
          count: parseInt(currentItem.count)
        }

        setCurrentItem(updatedItem)

        return updatedItem
      })
    })

    handleClose()
  }

  const handleShowAlert = () => {
    setShow(!show)
    setTimeout(() => {
      setShow(false)
    }, 1500)
  }

  const handleUpdateCount = (id, operation) => {
    setItems(data => {
      return data.map(item => {
        if (item.id !== id) {
          return item
        }

        let newCount = operation === 'add' ? item.count + 1 : item.count - 1
        console.log(newCount)
        return { ...item, count: newCount < 0 ? 0 : newCount }
      })
    })
  }

  return (
    <>
      <Container>
        <h1>Inventory Management System</h1>
        <TableContainer>
          <Table sx={{ minWidth: 1152 }}>
            <TableHead>
              <TableRow>
                <TableCell> No. </TableCell>
                <TableCell>品項</TableCell>
                <TableCell>描述</TableCell>
                <TableCell>價格</TableCell>
                <TableCell>庫存</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(Item => (
                <TableRow key={Item.id}>
                  <TableCell>{Item.id}</TableCell>
                  <TableCell>{Item.name}</TableCell>
                  <TableCell>{Item.description}</TableCell>
                  <TableCell>{Item.price}</TableCell>
                  <TableCell>
                    <IconButton
                      size='small'
                      onClick={() => handleUpdateCount(Item.id, 'remove')}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <span>{Item.count}</span>
                    <IconButton
                      size='small'
                      onClick={() => handleUpdateCount(Item.id, 'add')}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button variant='outlined' onClick={() => handleOpen(Item)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fade in={show} timeout='2000'>
          <div className='alertBox'>
            <Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
              已完成更新!
            </Alert>
          </div>
        </Fade>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 500 }}>
          <h2 id='child-modal-title'>
            修改品項 No.{currentItem ? currentItem.id : ''}
          </h2>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { mb: 2, width: '100%' }
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              required
              id='outlined-required'
              label='品項'
              defaultValue={currentItem ? currentItem.name : ''}
              onChange={e => {
                setCurrentItem(prev => ({ ...prev, name: e.target.value }))
              }}
            />
            <TextField
              id='outlined-multiline-static'
              label='描述'
              multiline
              rows={4}
              defaultValue={currentItem ? currentItem.description : ''}
              onChange={e =>
                setCurrentItem(prev => ({
                  ...prev,
                  description: e.target.value
                }))
              }
            />

            <TextField
              type='number'
              required
              id='outlined-required'
              label='價格'
              defaultValue={currentItem ? currentItem.price : ''}
              onChange={e =>
                setCurrentItem(prev => ({ ...prev, price: e.target.value }))
              }
            />
            <TextField
              type='number'
              required
              id='outlined-required'
              label='庫存'
              defaultValue={currentItem ? currentItem.count : ''}
              onChange={e =>
                setCurrentItem(prev => ({ ...prev, count: e.target.value }))
              }
            />
          </Box>
          <Stack direction='row' justifyContent='rught' spacing={2}>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                handleSave()
                handleShowAlert()
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default Week1
