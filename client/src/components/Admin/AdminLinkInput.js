import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

export default ({ children }) => {
  return (
    <div>
      <input
        id="admin-link-input"
        className="custom-admin-link-input"
        onKeyDown={children.props.onKeyDown}
        onChange={children.props.onChange}
        value={children.props.value}
        placeholder={children.props.placeholder}
        onBlur={e => {
          if (
            e.target.value &&
            e.target.value.length !== 0 &&
            !e.target.value.startsWith('https://') &&
            !e.target.value.startsWith('http://')
          ) {
            e.target.value = 'https://' + e.target.value;
            children.props.onChange(e);
          }
        }}
      />
      <UncontrolledTooltip
        autohide={false}
        placement="top"
        target="admin-link-input"
      >
        URL muss mit http:// oder https:// beginnen
      </UncontrolledTooltip>
    </div>
  );
};
