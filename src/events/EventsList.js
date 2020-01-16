import React, {useState} from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import CategoryList from './CategoryList'
import Sort from './Sort'

const styles = {
    ul: {
        listStyle: 'none',
        padding: 0,
        width: '80%',
        margin: 'auto'
    },
    span: {
        color: '#3c8c9b'
    }
};

function EventsList(props) {
    return(
        <div>
            <h1>Upcoming events</h1>
            <div className='top-bar'>
                <div className='filters'>
                    Category: <CategoryList categories={props.categories}/>
                    Sort by price: <Sort/>
                </div>
                <h4>Total count: <span style={styles.span}>{props.events.length}</span></h4>
            </div>
            <ul style={styles.ul}>
                {
                    props.events.map(event => {
                        return <EventItem event={event} key={event.id}/>
                    })
                }
            </ul>

        </div>
    )
}

EventsList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventsList;
