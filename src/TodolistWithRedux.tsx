import React, { ChangeEvent } from 'react';
import { FilterValuesType, TasksStateType, TodolistType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/task-reducer';
import { ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './state/todolists-reducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function TodolistWithRedux({ todolist }: PropsType) {
    const { id, title, filter } = todolist;
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id));
        // props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(id));
        // props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        // props.changeTodolistTitle(props.id, title);
        dispatch(ChangeTodolistTitleAC(id, title));
    }

    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(id, 'active'))
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(id, 'completed'))


    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        // props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        dispatch(changeTaskStatusAC(t.id,newIsDoneValue, id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        // props.changeTaskTitle(t.id, newValue, props.id);
                        dispatch(changeTaskTitleAC(t.id, newValue, id));
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


