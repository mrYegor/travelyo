import React, {useEffect} from 'react';
import EventsList from './events/EventsList';
import ImageSlider from './imageSlider/ImageSlider';
import Context from './context';

function App() {
  const [events, setEvents] = React.useState([]);
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [eventsCount, setEventsCount] = React.useState(2);
  const [visibleSlider, toggleSliderVisibility] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const addEventBtn = React.createRef();

  function getEvents(eventsCount) {
      fetch('https://s3.eu-central-1.amazonaws.com/js.smartair.co.il/custom/activities.json')
          .then(resp => resp.json())
          .then((events) => {
              /* Object.values() doesn't work in my version of Chrome, so I cheated in this case */
              events = Object.keys(events.activities).map(key => events.activities[key]);
              if(events.length > eventsCount) {
                  events.length = eventsCount;
              } else if (addEventBtn.current) {
                 addEventBtn.current.classList.add('none');
              }

              setEvents(events);
              setFilteredEvents(events);
              setCategories(getCategories(events));
              setEventsCount(eventsCount + 1);
          })
  }

  useEffect(() => {
      getEvents(eventsCount)
  }, []);

  function getCategories(events) {
      let tempCat = [];
      for (let event of events) {
          tempCat.push([...event.category])
      }
      for (let i = 0; i < tempCat.length; i++) {
          for (let category of tempCat[i]) {
              if (!categories.includes(category.toLowerCase())) {
                  categories.push(category.toLowerCase())
              }
          }
      }
      return categories
  }

  function addEvent() {
      getEvents(eventsCount);
  }

  function getImages(img) {
      if (img.length >= 1) {
          images.length = 0;
          images.push([...img]);
          toggleSliderVisibility(true);
          setImages(images);
      }
  }

  function filterByCategory(filteredCategory) {
      setEvents(filteredEvents);
      /* Some of categories are capitalized*/
      if (filteredCategory !== 'reset') {
          let capitalizeFilter = `${filteredCategory.charAt(0).toUpperCase()}${filteredCategory.slice(1)}`;
          setFilteredEvents(
              filteredEvents.filter(event => event.category.includes(filteredCategory) || event.category.includes(capitalizeFilter)
              ));
          setEvents(filteredEvents);
      }
  }

  function sortByPrice(priceDirection) {

      let sortDirection = [...filteredEvents];

      sortDirection.sort((a, b) => {
          return a.price - b.price
      });

      if (priceDirection === 'toLow') {
          sortDirection.reverse()
      }

      setEvents(sortDirection);
      setFilteredEvents(sortDirection);
  }

  function hideSlider() {
      toggleSliderVisibility(false);
  }

  return (
      <Context.Provider value={{getImages, hideSlider, filterByCategory, sortByPrice}}>
        <div className="wrapper">
          <ImageSlider visibleSlider={visibleSlider} slideImages={images}/>
          <EventsList events={events} categories={categories}/>
          <button type="submit" className='show-more-btn' onClick={addEvent} ref={addEventBtn}>Show more</button>
        </div>
      </Context.Provider>
  );
}

export default App;
