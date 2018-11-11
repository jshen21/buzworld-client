import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{
          overflowY: 'scroll',
        //   borderTop: '2px solid gray',
          backgroundColor: 'rgb(252, 252, 252)',
          margin: 'auto',
          width: '75%',
          height: '600px'}}>
      {props.children}
    </div>
  )
}

export default Scroll;