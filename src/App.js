import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  // state management
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);


  // next slide
  const nextSlide =()=>{
    index === (people.length - 1) ? setIndex(0) : setIndex(index + 1)
  }
    // next slide
    const previousSlide =()=>{
      index === 0 ? setIndex(people.length - 1) : setIndex(index - 1)
    }

  //  autoplay
  useEffect(() => {
    let slider = setInterval(() => {
      nextSlide();
    }, 3000);
    return ()=>{
      clearInterval(slider);
    }
  }, [index]);

  // helper function: render the listof reviews
  const renderReviews = ()=>{
    return people.map((person,pIndex) =>{

            const {id, image, name, title, quote} = person;
            let position = 'nextSlide';
            if(pIndex === index)  position ='activeSlide'
            if(pIndex === index - 1 ||(index === 0 && pIndex === people.length -1))  position = 'lastSlide'

            return <article key={id} className={position}>
                      <img src={image} alt={title} className="person-img"/>
                      <h4>{name}</h4>
                      <p className="title">{title}</p>
                      <p className="text">{quote}</p>
                      <FaQuoteRight className="icon"/>

                  </article>
    })
  }
  //render our component
  return <section className="section">
    <div className="title">
      <h2>
        <span>/</span> Reviews
      </h2>
    </div>
    <div className="section-center">
      { renderReviews() }
      <button onClick={previousSlide} className="prev"><FiChevronLeft/> </button>
      <button onClick={nextSlide} className="next"><FiChevronRight/> </button>
    </div>
  </section >;
}

export default App;

