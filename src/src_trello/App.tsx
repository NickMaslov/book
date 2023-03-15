import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { AppStateProvider, useAppState } from './state/AppStateContext';
import { Column } from './Column';
import { AppContainer } from './styles';
import { AddNewItem } from './AddNewItem';
import { addList } from './state/actions';
import { CustomDragLayer } from './CustomDragLayer';

export const App: React.FC = () => {
    const { lists, dispatch } = useAppState();

    console.log('*** ', lists);
    return (
        <DndProvider backend={Backend}>
            <AppStateProvider>
                <AppContainer>
                    <CustomDragLayer />
                    {lists &&
                        lists.map((list) => (
                            <Column
                                text={list.text}
                                key={list.id}
                                id={list.id}
                            />
                        ))}
                    <AddNewItem
                        toggleButtonText='+ Add another list'
                        onAdd={(text) => dispatch(addList(text))}
                    />
                </AppContainer>
            </AppStateProvider>
        </DndProvider>
    );
};
