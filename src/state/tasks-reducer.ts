import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask = { id: v1(), title: action.title, isDone: false }
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .map(t => t.id === action.taskId ? { ...t, title: action.title } : t)
            }

        case 'ADD-TODOLIST':
            return { ...state, [action.todolisID]: [] }
        case 'REMOVE-TODOLIST':
            // const copy = { ...state }
            // delete copy[action.id]
            // return copy
            const {[action.id]: [], ...rest} = state
            return rest
        
        default:
            return state
    }
}

export const removeTaskAC = ( taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK' as const,taskId , todolistId }
}
export const addTaskAC = (title: string, todolistId: string ) => {
    return { type: 'ADD-TASK' as const,title, todolistId  }
}
export const changeTaskStatusAC = (taskId: string,isDone: boolean,todolistId: string ) => {
    return { type: 'CHANGE-TASK-STATUS' as const, todolistId, taskId, isDone }
}
export const changeTaskTitleAC = ( taskId: string,title: string, todolistId: string ) => {
    return { type: 'CHANGE-TASK-TITLE' as const, todolistId, taskId, title }
}