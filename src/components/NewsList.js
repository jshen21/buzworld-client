import React from 'react';

const NewsList = ({newsList}) => {
    return (
        <div>
            {
                newsList.map((news,i) => (
                <div key={i} className='listOne w-100 w-100-ns pl3-ns bb b--black-10'>
                    <a href={news.url}>
                        <p className='f5 fw1 baskerville mt0 lh-title'>{news.title}</p>
                    </a>
                    <div className='f6 lh-copy mv0'>
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