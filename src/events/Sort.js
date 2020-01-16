import React, {useContext} from 'react';
import Context from '../context'

function Sort() {
    const {sortByPrice} = useContext(Context);
    const [selectedFilter, setSelectedFilter] = React.useState('');

    function applyFilterCategory(str) {
        setSelectedFilter(str)
    }

    return(
        <select className='sort'
                onClick={sortByPrice.bind(null, selectedFilter)}
                onChange={e => applyFilterCategory(e.target.value)}
        >
            <option value='reset'>Choose price</option>
            <option value='toHigh'>Low to High</option>
            <option value='toLow'>High to Low</option>
        </select>
    )
}

export default Sort;
