import React, {useContext, useState} from 'react';
import CategoryItem from './CategoryItem';
import Context from '../context'

function CategoryList({categories}) {
    const {filterByCategory} = useContext(Context);
    const [selectedFilter, setSelectedFilter] = React.useState('');

    function applyFilterCategory(str) {
        setSelectedFilter(str)
    }

    return(
        <select className='category-filter'
                onClick={filterByCategory.bind(null, selectedFilter)}
                onChange={e => applyFilterCategory(e.target.value)}
        >
            <option value='reset'>All categories</option>
            {
                categories.map((category, index) => {
                    return <CategoryItem category={category} key={index + 1} />
                })
            }
        </select>
    )
}

export default CategoryList;
