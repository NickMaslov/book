import {
    createContext,
    // useReducer,
    Dispatch,
    useContext,
    FC,
    ReactNode,
} from 'react';
import { useImmerReducer } from 'use-immer';
import { List, Task, AppState, appStateReducer } from './appStateReducer';
import { Action } from './actions';
import { DragItem } from '../DragItem';

type AppStateContextProps = {
    draggedItem: DragItem | null;
    lists: List[];
    getTasksByListId(id: string): Task[];
    dispatch: Dispatch<Action>;
};

const appData: AppState = {
    lists: [
        {
            id: '0',
            text: 'To Do',
            tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
        },
        {
            id: '1',
            text: 'In Progress',
            tasks: [{ id: 'c2', text: 'Learn Typescript' }],
        },
        {
            id: '2',
            text: 'Done',
            tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
        },
    ],
    draggedItem: null,
};

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
);

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData);

    console.log('#*#*#*#*#', state);
    const { draggedItem, lists } = state;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    };

    console.log('#*lists*#', lists);
    return (
        <AppStateContext.Provider
            value={{ draggedItem, lists, getTasksByListId, dispatch }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext);
};
