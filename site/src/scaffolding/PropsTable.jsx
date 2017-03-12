import React, {PropTypes} from 'react';
import marked from 'marked';
import get from 'lodash/get';

const propTypes = {
  entries: PropTypes.object,
  size: PropTypes.string,
  title: PropTypes.string
}

const defaultProps = {
  entries: {},
  size: 'is-two-third',
  title: 'Injected Props'
}

const renderDesc = (entries) => (
  entries.split('\n')
    .map((entry, idx) => (
      <div
        key={idx}
        className='sentence'
        dangerouslySetInnerHTML={{
          __html: marked(entry.replace(' ', ''))
        }}
      />
    ))
);

const renderTableBody = (entries) => (
  Object.keys(entries)
    .map((prop) => {
      const desc = renderDesc(get(entries, prop, ''))

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
