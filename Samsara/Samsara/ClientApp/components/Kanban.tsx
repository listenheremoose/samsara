import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { KanbanColumn } from './KanbanColumn';
import 'isomorphic-fetch';

interface KanbanExampleState {
    columns: Column[];
    loading: boolean;
}

export class Kanban extends React.Component<RouteComponentProps<{}>, KanbanExampleState> {
    constructor() {
        super();
        this.state = { columns: [], loading: true };

        fetch('api/Kanban/Columns')
            .then(response => response.json() as Promise<Column[]>)
            .then(data => {
                this.setState({ columns: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <div className='loader'></div>
            : Kanban.renderKanbanBoard(this.state.columns);

        return <div>
            <h1><span className='glyphicon glyphicon-object-align-top'></span> Kanban</h1>
            { contents }
        </div>;
    }

    private static renderKanbanBoard(columns: Column[]) {
        return <table className='table'>
            <thead>
                <tr>
                    {columns.map(column => <th key={column.id} className='kanban-columnHeader'>{column.name}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {columns.map(column => <KanbanColumn id={column.id} />)}
                </tr>
            </tbody>
        </table>;
    }
}

interface Column {
    id: number;
    name: string;
}