import React, {useContext, useState} from 'react';
import Context from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const styles = {
    li: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F4F4F3',
        justifyContent: 'space-between',
        margin: 20,
        padding: 10,
    },
    img: {
        width: 300,
        cursor: 'pointer'
    },
    div: {
        backgroundColor: '#fff',
        padding: 10,
    }
};

function EventItem({event}) {
    const {getImages, filterByCategory} = useContext(Context);

    const [showMoreLink, setShowMoreLink] = React.useState(true);

    function showMoreDescr(e) {
        e.preventDefault();
        setShowMoreLink(false);
    }

    return(
        <li style={styles.li}>
            <div style={styles.div}>
                <h3>Ticket price</h3>
                <span>{event.price}</span>
            </div>
            <div style={styles.div} className='description-wrapper'>
                <h3 onClick={filterByCategory.bind(null, event.name)}>
                    {event.name}
                </h3>

                    {event.description.length > 200 && showMoreLink ?
                        (<p>
                            {`${event.description.substring(0, 200)}...`} <a href='#' className='read-more' onClick={showMoreDescr}>Read more</a>
                        </p>) :
                        (<p>{event.description}</p>)
                    }
                    <div className='date' title='Event Date'>
                        {event.dates[0]} <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className='popularity' title='Popularity of the event'>
                        <span>Popular Event</span>
                        {event.popular ? <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faThumbsDown} />}
                    </div>
            </div>
            <div>
                <img src={event.images[0]} style={styles.img} onClick={getImages.bind(null, event.images)}/>
            </div>
        </li>
    )
}

export default EventItem;
