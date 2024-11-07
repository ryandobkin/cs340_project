import * as React from 'react';
import Item from './Item';

export function GridLayout() {

    const table_headers = ['bsg_people.id', 'fname', 'lname', 'bsg_planets.name', 'age'];

    const rows = [
        { tableID: 1, tableTitle: 'header1', tableCount: 20},
        { tableID: 2, tableTitle: 'header2', tableCount: 30},
        { tableID: 3, tableTitle: 'header3', tableCount: 40}
    ];

    return (
        <div Class="table-container">
            <h1></h1>
            <table Class="table-style">
                <thead>
                <tr >
                    {table_headers.map((header, index) => (
                        <th Class="d-container" key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.tableID} >
                            <td Class="d-container">{row.tableID}</td>
                            <td Class="d-container">{row.tableTitle}</td>
                            <td Class="d-container">{row.tableCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GridLayout;