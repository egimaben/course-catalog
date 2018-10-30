import React from 'react';
const NoMatch = (props) => {
  console.log('no match::', props);
  return (<div>404 No match for {props.location.pathname}</div>);
}
export default NoMatch;