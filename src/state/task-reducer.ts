import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { TaskType } from '../Todolist';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleActionType = ReturnType<typeof changeTaskTitleAC>
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: string
//     title: string
// }
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER',
//     id: string
//     filter: FilterValuesType
// }

type ActionsType = RemoveTaskActionType
    | AddActionType
    | ChangeStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState:TasksStateType = {}

export const taskReducer = (state = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = { id: v1(), title: action.taskTitle, isDone: false }
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':

            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ?
                    { ...el, isDone: action.taskIsDone } : el)
            }
        case 'CHANGE-TASK-TITLE':

            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ?
                    { ...el, title: action.taskTitle } : el)
            }
        case 'ADD-TODOLIST':

            return {
                ...state,
                [action.todolisID]:[]
            }
            case 'REMOVE-TODOLIST': {
                let copyState = {...state}
                delete copyState[action.id]
                return copyState;
            }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistID } as const;
}
export const addTaskAC = (taskTitle: string, todolistID: string) => {
    return { type: 'ADD-TASK', taskTitle, todolistID } as const
}
export const changeTaskStatusAC = (taskId: string, taskIsDone: boolean, todolistID: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, taskIsDone, todolistID } as const
}
export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistID: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, taskTitle, todolistID } as const
}


