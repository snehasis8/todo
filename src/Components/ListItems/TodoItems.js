import React, { useEffect, useState } from "react";
import { Stack, Button, Typography, IconButton, Divider, Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from "framer-motion"
import "../../App.css";

const TodoItems = React.memo(({ listData, deleteNotes, handleCheckbox, totalCount, operatingItemId }) => {
    const renderList = Object.values(listData);
    // eslint-disable-next-line no-unused-vars
    const [__, setLoading] = useState(true)
    useEffect(() => {
        return () => {
            setTimeout(() => {
                setLoading(false)
            }, 1300)
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
            maxHeight: "calc(60vh - 5rem)",
            overflowY: "auto",
            justifyContent: "stretch",
            margin: "0.5rem 2rem",
            border: "1px solid #312f2fc2",
            overflowX: "hidden",
        }}
    >
        <AnimatePresence >
            {renderList?.reverse().map((element, i) => {
                return (
                    <Stack
                        key={element.id}
                        spacing={{ xs: 0.2, sm: 0.5, md: 1 }}
                        component={motion.div}
                        variants={{
                            hidden: { opacity: 0, y: -50 },
                            visible: (i) => ({
                                opacity: 1,
                                y: 0,
                                transition: { delay: i * 0.7 },
                            }),
                            exit: { opacity: 0, y: 50 },
                        }}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Stack
                            direction={{ md: "row", xs: "column", sm: "row" }}
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
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "space-evenly",
                                    padding: "0 0.5rem",
                                }}
                            >
                                <Checkbox
                                    onChange={() => handleCheckbox(element)}
                                    checked={element.isChecked}
                                />
                                <Divider variant="middle" orientation="vertical" />
                                <motion.span
                                    style={{ position: "relative" }}
                                // className="my-p"
                                >
                                    <Typography
                                        className="my-p"
                                        component={motion.p}
                                        variants={{
                                            checked: (element) => ({
                                                marginLeft: element.isChecked ? '1rem' : '0px',
                                                opacity: element.isChecked ? 0.5 : 1,
                                                scale: element.isChecked ? 1.2 : 1,
                                                rotate: element.isChecked ? 360 : 0,
                                                textDecoration: element.isChecked
                                                    ? "line-through"
                                                    : "unset",
                                                transition: { duration: 0.5 },
                                            }),
                                        }}
                                        initial={false}
                                        animate="checked"
                                        custom={element}
                                        key={element.id}
                                        mt={1}
                                        align="left"
                                        alignContent={"flex-start"}
                                    >
                                        {element.value}
                                    </Typography>
                                </motion.span>
                            </div>

                            {/* <Button >Delete</Button> */}

                            <>
                                <IconButton
                                    title="Delete item"
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "block",
                                            md: "block",
                                            lg: "block",
                                            xl: "block",
                                        },
                                    }}
                                    onClick={() => deleteNotes(element)}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <Button
                                    onClick={() => deleteNotes(element)}
                                    fullWidth
                                    mt={2}
                                    sx={{
                                        display: {
                                            xs: "block",
                                            sm: "none",
                                            md: "none",
                                            lg: "none",
                                            xl: "none",
                                        },
                                        marginTop: "1rem !important",
                                    }}
                                    variant="outlined"
                                >
                                    {" "}
                                    Delete{" "}
                                </Button>
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
