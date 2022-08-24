import React, { useEffect } from "react";
import { Stack, Button, Typography, IconButton, Tooltip, Divider, Checkbox } from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";
// import { DeleteIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
// import useMediaQuery from '@mui/material/useMediaQuery';

const TodoItems = React.memo(({ listData, deleteNotes, handleCheckbox, totalCount, operatingItemId }) => {
    const renderList = Object.values(listData);

    useEffect(() => {
        return () => {
            //component will unmount action
            localStorage.setItem('NoteData', JSON.stringify(renderList));
        };
    }, [renderList]);




    return (
        <Stack
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
            }}
        >
            {renderList?.reverse().map((element, i) => {
                return (
                    <Stack
                        spacing={{ xs: 0.2, sm: 0.5, md: 1 }}
                    >
                        <Stack
                            direction={{ md: 'row', xs: 'column', sm: 'row' }}
                            spacing={{ md: 2 }}
                            sx={{
                                padding: "20px",
                                // height: "34px",
                                wordBreak: "break-word",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                            elevation={3}
                            key={element.id}
                            variant=""
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
                            <Tooltip title="Delete">
                                <>
                                    <IconButton sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }} tooltip onClick={() => deleteNotes(element)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <Button onClick={() => deleteNotes(element)} fullWidth mt={2} sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' }, marginTop: '1rem !important' }} variant="outlined"> Delete </Button>
                                </>
                            </Tooltip>
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
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
