import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{
          overflowY: 'scroll',
          backgroundColor: 'rgb(252, 252, 252)',
          margin: 'auto',
          width: '75%',
          height: '500px'}}>
      {props.children}
    </div>
  )
}

export default Scroll;