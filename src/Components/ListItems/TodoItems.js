import React, { useEffect } from "react";
import { Paper, Stack, Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const TodoItems = ({ listData, deleteNotes, handleCheckbox, totalCount }, nextProp) => {
    console.log(nextProp);

    const renderList = Object.values(listData);

    useEffect(() => {
        console.log('hit');
        return () => {
            //component will unmount action
            console.log("unmount will fire");
            // localStorage.setItem('NoteData', JSON.stringify(renderList));
        };
    }, []);


    useEffect(() => {
        console.log('itemUpdated');
    }, [totalCount])

    console.log('rendering', totalCount);

    return (
        <Stack
            spacing={2}
            sx={{
                padding: "0.5rem",
                maxHeight: "calc(75vh - 5rem)",
                overflowY: "auto",
                justifyContent: "stretch",
                margin: "1rem",
                border: "1px solid #8c8888c2",
                backgroundColor: "#78979d0f"
            }}
        >
            {renderList?.reverse().map((element, i) => {
                return (
                    <Paper
                        sx={{
                            padding: "20px",
                            height: "34px",
                            wordBreak: "break-word",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        elevation={3}
                        key={element.id}
                    >
                        <div>
                            <Checkbox
                                onChange={() => handleCheckbox(element)}
                                checked={element.isChecked}
                            />
                            <span
                                style={{
                                    textDecorationLine: element.isChecked
                                        ? "line-through"
                                        : "unset",
                                    textDecorationColor: "#f0164f9c",
                                }}
                            >

                                {element.value}
                            </span>
                        </div>
                        {/* <Divider variant='middle' orientation='vertical' /> */}
                        <Button onClick={() => deleteNotes(element)}>
                            Delete
                        </Button>
                    </Paper>
                );
            })}
        </Stack>
    );
};

export default React.memo(TodoItems);
