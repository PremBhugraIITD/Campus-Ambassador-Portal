import React from 'react';

const DescriptionWithLink = ({text}) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);
  
    return (
      <div>
        {parts.map((part, index) => {
          if (urlRegex.test(`{${part}}`)) {
            return (
              <a style={{color:"blue"}} href={part} key={index} target="_blank" rel="noopener noreferrer">
                {part}
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
}

export default DescriptionWithLink;
