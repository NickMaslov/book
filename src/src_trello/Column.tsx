import React from 'react';
import { ColumnContainer, ColumnTitle } from './styles';
import { AddNewItem } from './AddNewItem';

import { useAppState } from './state/AppStateContext';
import { Card } from './Card';

// type ColumnProps = {
//     text: string;
//     children?: React.ReactNode;
// };
type ColumnProps = React.PropsWithChildren<{
    text: string;
    id: string;
}>;

export const Column = ({ text, children, id }: ColumnProps) => {
    const { getTasksByListId } = useAppState();
    const tasks = getTasksByListId(id);

    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map((task) => (
                <Card text={task.text} key={task.id} id={task.id} />
            ))}

            <AddNewItem
                toggleButtonText='+ Add another task'
                onAdd={console.log}
                dark
            />
        </ColumnContainer>
    );
};
