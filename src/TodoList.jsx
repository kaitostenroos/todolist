import { useState, useRef } from 'react';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Stack from '@mui/material/Stack';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import 'dayjs/locale/de';


function TodoList() {
    const [todo, setTodo] = useState({ description: "", priority: "", date: null });
    const [todos, setTodos] = useState([]);

    const gridRef = useRef();

    const columns = [
        { field: "desc", sortable: true, filter: true },
        {
            field: "priority", sortable: true, filter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        { field: "date", sortable: true, filter: true }
    ];

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'description',
            filter: true,
            floatingFilter: true
        },
        {
            field: 'priority', cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
            filter: true,
            floatingFilter: true
        },
        {
            field: 'date',
            filter: true,
            floatingFilter: true
        },

    ]);

    const handleAdd = () => {
        if (!todo.description.trim()) {
            alert("Type description first!");
        } else {
            setTodos([todo, ...todos]);
            setTodo({ description: "", priority: "", date: "" });
        }
    };

    const handleDateChange = (date) => {
        setTodo({ ...todo, date: date.format('DD.MM.YYYY') });
    }

    const handleDelete = () => {
        const selectedNodes = gridRef.current.getSelectedNodes();
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id))
        } else {
            alert('Select a row first!');
        }
    };

    return (
        <>
            <Stack 
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center">
                <TextField
                    placeholder="Description"
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                    value={todo.description} />
                <TextField
                    placeholder="Priority"
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}
                    value={todo.priority} />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker
                        value={dayjs(todo.date)}
                        onChange={handleDateChange}
                        renderInput={(params) => <input {...params} placeholder="Date" />}
                    />
                </LocalizationProvider>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleDelete}>Delete</button>
            </Stack>

            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    columnDefs={columnDefs}
                    rowData={todos}
                    selection={{ mode: "singleRow" }}
                />
            </div>
        </>
    );
}

export default TodoList;
