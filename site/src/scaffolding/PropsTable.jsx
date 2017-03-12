import React, {PropTypes} from 'react';

const propTypes = {
  keyedList: PropTypes.object,
  size: PropTypes.string,
  title: PropTypes.string
}

const defaultProps = {
  entries: {},
  size: 'is-two-third',
  title: 'Injected Props'
}

const renderTableBody = (entries) => (
  Object.keys(entries)
    .map((prop) => {
      let desc = entries[prop];

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

const PropsTable = (props) => (
  <div className={`column ${props.size}`}>
    <h4>{props.title}</h4>
    <div className='table-overflow'>
      <table className='table is-bordered is-narrow is-striped'>
        <thead>
          <tr>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{renderTableBody(props.entries)}</tbody>
      </table>
    </div>
  </div>
);

PropsTable.propTypes = propTypes;
PropsTable.defaultProps = defaultProps;
export default PropsTable;
