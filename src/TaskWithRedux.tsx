import React, { ChangeEvent, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType } from "./Todolist";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
type TaskPropsType = {
    task: TaskType
    todoListsId: string
}

export const Task = memo(({ task, todoListsId }: TaskPropsType) => {

    // const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListsId].find(t=>t.id === taskId) as TaskType)
    const dispath = useDispatch()
    const onClickHandler = () => dispath(removeTaskAC(task.id, todoListsId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispath(changeTaskStatusAC(task.id, newIsDoneValue, todoListsId));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispath(changeTaskTitleAC(task.id, newValue, todoListsId));
    }

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})


