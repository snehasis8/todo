import React, { useState, useEffect, useCallback, useRef } from 'react'
import { TextField, Stack, Button } from '@mui/material';
import TodoItems from '../ListItems/TodoItems';
import { motion } from "framer-motion"

// loading animation completed 
// delete animation completed

export const Searchbar = () => {

  const inputEl2 = useRef(null);

  const [listtItems, setListItems] = useState(JSON.parse(localStorage.getItem('NoteData')) || []);
  const [currentText, setText] = useState('');
  const [operatingItemId, setOperatingIdItem] = useState('');
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const savedData = JSON.parse(localStorage.getItem('NoteData')) || [];
    // setListItems(savedData);


    setTimeout(() => {
      console.log(inputEl2.current.actions);
      inputEl2.current.focus();

    }, 2000);
  }, [])



  const addItems = () => {
    if (currentText.length > 0) {
      const tempList = [...listtItems];
      const addebleitem = {
        value: currentText,
        id: (Math.random() * 1000).toFixed(0),
        isChecked: false,
      }

      localStorage.setItem('NoteData', JSON.stringify([...tempList, addebleitem]));
      //modification of this functiom is needed to fix thi bug
      setListItems((prevState) => ([
        ...prevState,
        addebleitem,
      ]));
      setText('')
    }

  }

  const deleteNotes = useCallback((deleteItem) => {


    const result = listtItems.findIndex((el) => el.id === deleteItem.id);
    const updatedList = [...listtItems]
    updatedList.splice(result, 1);
    localStorage.setItem('NoteData', JSON.stringify(updatedList));
    setListItems(updatedList);
    // setOperatingIdItem(deleteItem.id);
    setText('')

  }, [listtItems])

  const deleteAllItems = useCallback(() => {
    localStorage.setItem('NoteData', '[]');
    setListItems([]);
    setText('')
  }, [])

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

  const listtItemsFlag = !!listtItems.length > 0;

  return (
    <motion.div variants={containerAnimation} initial="hidden" animate="show" exit="exit">
      <Stack
        component={motion.div}
        variants={item}

        // whileTap={{ scale: 0.9 }}
        direction={{ md: "row", xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-evenly",
          margin: "0.5rem 2rem",
        }}
      >
        <TextField
          inputRef={inputEl2}
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
        <Button onClick={deleteAllItems}> Delete All</Button>

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
