import React from 'react';
import definitions from '../definitions';

const renderTableBody = () => (
  Object.keys(definitions.props)
    .map((prop) => {
      let desc = definitions.props[prop];

      if (Array.isArray(desc)) {
        desc = desc.map((value, key) => (
          <p key={key}>{value}</p>
        ));
      }

      return (
        <tr key={prop}>
          <td>{prop}</td>
          <td>{desc}</td>
        </tr>
      )
    })
);

const PropsTable = () => (
  <div className='is-two-third column'>
    <h4>Injected Props</h4>
    <div className='table-overflow'>
      <table className='table is-bordered is-narrow is-striped'>
        <thead>
          <tr>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  </div>
);

export default PropsTable;
