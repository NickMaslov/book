import React from 'react';
import { Column } from './Column';
import { AppContainer } from './styles';
import { AddNewItem } from './AddNewItem';
import { AppStateProvider, useAppState } from './state/AppStateContext';

export const App: React.FC = () => {
    const { lists } = useAppState();

    console.log(lists);
    return (
        <AppStateProvider>
            <AppContainer>
                {lists.map((list) => (
                    <Column text={list.text} key={list.id} id={list.id} />
                ))}
                <AddNewItem
                    toggleButtonText='+ Add another list'
                    onAdd={console.log}
                />
            </AppContainer>
        </AppStateProvider>
    );
};
