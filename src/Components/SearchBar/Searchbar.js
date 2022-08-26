import React, { useState, useEffect, useCallback } from 'react'
import { TextField, Stack, Button } from '@mui/material';
import TodoItems from '../ListItems/TodoItems';
import { motion } from "framer-motion"

// loading animation completed 
// delete animation completed

export const Searchbar = () => {

  const [listtItems, setListItems] = useState(JSON.parse(localStorage.getItem('NoteData')) || []);
  const [currentText, setText] = useState('');
  const [operatingItemId, setOperatingIdItem] = useState('');
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const savedData = JSON.parse(localStorage.getItem('NoteData')) || [];
    // setListItems(savedData);
  }, [])



  const addItems = useCallback(async () => {
    if (currentText.length > 0) {
      localStorage.setItem('NoteData', JSON.stringify(listtItems));
      setListItems((prevState) => [
        ...prevState,
        {
          value: currentText,
          id: (Math.random() * 1000).toFixed(0),
          isChecked: false,
        },
      ]);

      // localStorage.setItem('NoteData', JSON.stringify(listtItems));
      setText('')
    }

  }, [currentText, listtItems])

  const deleteNotes = useCallback((deleteItem) => {


    const result = listtItems.findIndex((el) => el.id === deleteItem.id);
    const updatedList = [...listtItems]
    updatedList.splice(result, 1);
    localStorage.setItem('NoteData', JSON.stringify(updatedList));
    setListItems(updatedList);
    // setOperatingIdItem(deleteItem.id);
    setText('')

  }, [listtItems])

  const handleCheckbox = useCallback((checkboxItem) => {

    const result = listtItems.findIndex((el) => el.id === checkboxItem.id);
    const updatedList = [...listtItems]
    updatedList[result].isChecked = !checkboxItem.isChecked;
    localStorage.setItem('NoteData', JSON.stringify(updatedList));
    setListItems(updatedList);
    setOperatingIdItem(checkboxItem.id);
    setText('')

  }, [listtItems])

  // const rederTodoList = !!listtItems.length > 0 && loading;

  const containerAnimation = {
    show: {
      transition: {
        staggerChildren: 1,
      },
    },
  };
  const item = {

    hidden: { opacity: 0, y: -200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.6,
        delayChildren: 4
      },
    },
    exit: {
      opacity: 0,
      y: 200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  }

  //https://stackoverflow.com/questions/70668440/framer-motion-animate-presence-without-conditional-rendering        
  // console.log(rederTodoList);
  // console.log(loading);
  const listtItemsFlag = !!listtItems.length > 0;

  console.log(listtItemsFlag);
  return (
    <motion.div variants={containerAnimation} initial="hidden" animate="show" exit="exit">
      <Stack
        component={motion.div}
        variants={item}
        direction={{ md: "row", xs: "column", sm: "row" }}
        sx={{
          padding: "1rem",
          border: "1px solid #8c8888c2",
          justifyContent: "space-evenly",
          margin: "1rem",
          backgroundColor: "#78979d0f",
        }}
      >
        <TextField
          sx={{ width: { xs: "100%", md: "90%", sm: "80%", lg: "80%" } }}
          fullWidth
          multiline
          helperText={
            listtItems.length > 0
              ? `Add Items || Item Count : ${listtItems.length}`
              : `Add Items  || Item Count : 0`
          }
          label="Take Notes"
          margin="dense"
          variant="standard"
          onChange={(event) => setText(event.target.value)}
          value={currentText}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.shiftKey === false) {
              addItems();
            }
          }}
        />
        <Button onClick={addItems}> Add Item</Button>
      </Stack>


      {listtItemsFlag &&
        <motion.div initial={{ opacity: 0, y: 200 }} variants={item}>
          <TodoItems
            operatingItemId={operatingItemId}
            totalCount={listtItems.length}
            listData={Object.values(listtItems)}
            deleteNotes={deleteNotes}
            handleCheckbox={handleCheckbox}
          />
        </motion.div>
      }

      {/* {<motion.div key={14} variants={item} style={{ height: '100px', width: '100px', background: 'lightgreen' }}> Hola </motion.div>} */}
    </motion.div>
  );
}
export default Searchbar
