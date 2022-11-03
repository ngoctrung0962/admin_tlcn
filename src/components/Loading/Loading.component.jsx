import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.component.css';

export default function Loading({
  color = '#00BFFF',
  width = '100%',
  height = '100%',
  display = 'flex',
}) {
  return (
    <div
      className='loading'
      style={{
        width: width,
        height: height,
        display: display,
      }}
    >
      <ReactLoading
        type={'spinningBubbles'}
        color={color}
        height={
          !isNaN(height.replace('px', ''))
            ? Number(height.replace('px', ''))
            : 50
        }
        width={
          !isNaN(width.replace('px', '')) ? Number(width.replace('px', '')) : 50
        }
      />
    </div>
  );
}
