import React from 'react';

const NewsList = ({newsList}) => {
    return (
        <div>
            {
                newsList.map((news,i) => (
                <div key={i} className='pv2'>
                    <a href={news.url}>
                        <p className='fw7 underline-hover'>{news.title}</p>
                    </a>
                    <div className='db black-60'>
                        <small>{news.source.name}</small> 
                        {'  |  '}
                        <small>{news.publishedAt}</small>
                    </div>
                </div>
                ))
            }
        </div>
    )
  }
  
  export default NewsList;