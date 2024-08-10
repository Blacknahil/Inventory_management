
'use client';

import { firestore } from "@/firebase";
import { Box, Typography,Modal, Stack, TextField,Button } from "@mui/material";
import { collection, query,getDocs, doc, getDoc, deleteDoc,setDoc} from "firebase/firestore";
import {useState,useEffect} from 'react';

export default function Home() {
  const [inventory, setInventory]= useState([]);
  const [open , setOpen] = useState(true);
  const [itemName , setItemName] = useState('');

  const updateInventory = async () =>{
    const snapshot =query(collection(firestore,'inventory'));
    const docs = await getDocs(snapshot)
    const inventoryList =[]
    docs.forEach((doc)=>{
      inventoryList.push({
        name:doc.id,
        ...doc.data(),
      })
    })

    console.log(inventoryList)
    setInventory(inventoryList);
  }


  const removeItem= async (item) =>{

    const docRef = doc(collection(firestore,'inventory'),item);

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {quantity} = docSnap.data()

      if(quantity ==1){
        await deleteDoc(docRef)
      } else{
        await setDoc(docRef,{quantity:quantity-1});
      }

    }

    await updateInventory();
  }



  const addItem= async (item) =>{

    const docRef = doc(collection(firestore,'inventory'),item);

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {quantity} = docSnap.data()
        await setDoc(docRef,{quantity:quantity+1});

    }
    else{
      await setDoc(docRef,{quantity:1})
    }
    await updateInventory();
  }










  useEffect(()=>{
    updateInventory()
  },[])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" 
    flexDirection="column"
    gap={2} >
      <Modal open={open} onClose={handleClose}>
        <Box position='absolute'
        top="50%"
        left="50%"
        sx={{
          transform:"translate(-50%,-50%)"
        }}
        
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="text"
        flexDirection="column"
        gap={3}
        >
          <Typography variant="h6">
            Add Item
          </Typography>
          <Stack width="100%"  direction="row" spacing={2}>
            <TextField
             variant="outlined"
             fullWidth
             value={itemName}
             onChange={(e)=>{
              setItemName(e.target.value)
             }}
            />
            <Button variant="outlined" 
            onClick={()=>{
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >Add</Button>


          </Stack>
        </Box>
      </Modal>

      {/* <Typography variant="h1">Inventory Management</Typography> */}
      

      <Button
      variant="contained"
      onClick={()=>{
        handleOpen()
      }}
      >Add New Item</Button>
       <Box border="1px solid #333 ">
        <Box  height="150px" width="1000px" bgcolor="#ADD8E4"
        display="flex" alignItems="center" justifyContent="center"
        
        >
          <Typography variant="h2" color="#333"> Inventory Items</Typography>
          </Box>


       <Stack width="1000px" height="500px" spacing={2} overflow="auto">

        {inventory.map(({name,quantity})=>(
          <Box 
          key={name} width="95%" minHeight="150px"
          display={'flex'}
          alignItems="center" 
          justifyContent={'space-between'}
          bgColor={'#f0f0f0'}
          paddingX={2}
          >
            <Typography variant="h3" 
            color="#333"
            textAlign="center"
            >{name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>

            <Typography variant="h3" 
            color="#333"
            textAlign="center"
            >{quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={()=>{
              addItem(name)
            }}>Add</Button>

<Button variant="contained" onClick={()=>{
              removeItem(name)
            }}>Remove</Button>
            </Stack>
          </Box>

        ))}
       </Stack>
    </Box>
    </Box>

   

  );
}
