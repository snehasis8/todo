import React, { useState, useEffect, useCallback } from 'react'
import { TextField, Stack, Button } from '@mui/material';
import TodoItems from '../ListItems/TodoItems';

// React .memo and usememo are two different function
// probaly need to fix the use call back expression 
// need to implement some kind of optimisation for this

export const Searchbar = () => {

  const [listtItems, setListItems] = useState([]);
  const [currentText, setText] = useState('');


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('NoteData')) || [];
    setListItems(savedData);
  }, [])

  const addItems = useCallback(() => {
    if (currentText.length > 0) {
      setListItems((prevState) => [
        ...prevState,
        {
          value: currentText,
          id: (Math.random() * 1000).toFixed(0),
          isChecked: false,
        },
      ]);
      console.log(listtItems);
      localStorage.setItem('NoteData', JSON.stringify(listtItems));
      setText('')
    }

  }, [currentText, listtItems])

  const deleteNotes = useCallback((deleteItem) => {

    const result = listtItems.findIndex((el) => el.id === deleteItem.id);
    const updatedList = [...listtItems]
    updatedList.splice(result, 1);
    localStorage.setItem('NoteData', JSON.stringify(updatedList));
    setListItems(updatedList);
    setText('')

  }, [listtItems])

  const handleCheckbox = useCallback((checkboxItem) => {

    const result = listtItems.findIndex((el) => el.id === checkboxItem.id);
    const updatedList = [...listtItems]
    updatedList[result].isChecked = !checkboxItem.isChecked;
    localStorage.setItem('NoteData', JSON.stringify(updatedList));
    setListItems(updatedList);
    setText('')

  }, [listtItems])
  return (
    <>

      <Stack direction='row' sx={{ border: '1px solid #8c8888c2', justifyContent: 'space-evenly', margin: '1rem' }}>

        <TextField
          sx={{ width: '40rem' }}
          multiline
          helperText={listtItems.length > 0 ? `Add Items || Item Count : ${listtItems.length}` : `Add Items  || Item Count : 0`}
          label="Take Notes"
          margin="dense"
          variant="standard"
          onChange={(event) => setText(event.target.value)}
          value={currentText}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.shiftKey === false) {
              addItems();
            }
          }
          }
        />

        <Button onClick={addItems}> Add Item</Button>
      </Stack>

      {listtItems.length > 0 && <TodoItems totalCount={listtItems.length} listData={Object.values(listtItems)} deleteNotes={deleteNotes} handleCheckbox={handleCheckbox} />}
    </>

  );
}
export default Searchbar
