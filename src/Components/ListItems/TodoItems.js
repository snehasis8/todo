import React, { useEffect, useState } from "react";
import { Stack, Button, Typography, IconButton, Divider, Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from "framer-motion"

const TodoItems = React.memo(({ listData, deleteNotes, handleCheckbox, totalCount, operatingItemId }) => {
    const renderList = Object.values(listData);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        return () => {
            setTimeout(() => {
                setLoading(false)
            }, 1300)
            //component will unmount action
            // localStorage.setItem('NoteData', JSON.stringify(renderList));
        };
    }, [renderList]);


    return (<Stack
        // initial={{ opacity: 0, y: 200 }}
        // animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: 200 }}
        // transition={{ type: "tween", duration: 0.7 }}
        elevation={3}
        spacing={{ xs: 0.2, sm: 0.5, md: 1 }}
        // direction={{ md: 'column', xs: 'row', sm: 'row' }}
        sx={{
            padding: "0.5rem",
            maxHeight: "calc(75vh - 5rem)",
            overflowY: "auto",
            justifyContent: "stretch",
            margin: "1rem",
            border: "1px solid #8c8888c2",
            backgroundColor: "#78979d0f",
            overflowX: "hidden",
        }}
    >
        {loading && <p style={{ textAlign: "center" }}> Loading...</p>}
        <AnimatePresence >
            {!loading && renderList?.reverse().map((element, i) => {
                return (
                    <Stack
                        key={element.id} spacing={{ xs: 0.2, sm: 0.5, md: 1 }}
                        component={motion.div}
                        variants={{
                            hidden: { opacity: 0, y: -50 },
                            visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.7 } }),
                            exit: { opacity: 0, y: 50 }
                        }}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Stack
                            direction={{ md: 'row', xs: 'column', sm: 'row' }}
                            spacing={{ md: 2 }}
                            sx={{
                                wordBreak: "break-word",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // border: "1px solid red"
                            }}
                            elevation={8}
                            key={i}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'start',
                                justifyContent: 'space-evenly',
                                padding: '0 0.5rem',
                            }}>
                                <Checkbox
                                    onChange={() => handleCheckbox(element)}
                                    checked={element.isChecked}
                                />
                                <Divider variant='middle' orientation='vertical' />
                                <span
                                    style={{
                                        textDecorationLine: element.isChecked
                                            ? "line-through"
                                            : "unset",
                                        textDecorationColor: "#f0164f9c",
                                    }}
                                >
                                    <Typography mt={1} align="left" alignContent={"flex-start"} > {element.value} </Typography>
                                </span>
                            </div>

                            {/* <Button >Delete</Button> */}

                            <>
                                <IconButton title="Delete item" sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }} onClick={() => deleteNotes(element)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <Button onClick={() => deleteNotes(element)} fullWidth mt={2} sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }, marginTop: '1rem !important' }} variant="outlined"> Delete </Button>
                            </>

                        </Stack>
                    </Stack>
                );
            })}
        </AnimatePresence>
    </Stack >
    );
}, (prevProp, nextProp) => {
    //call back
    let flag = false;

    if (prevProp.operatingItemId > 0 || nextProp.operatingItemId > 0) {
        flag = true;
    }

    if (prevProp.totalCount !== nextProp.totalCount || flag) {
        return false
    } else {
        return true
    }

})

export default TodoItems;
