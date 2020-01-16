import React from 'react';

const styles = {
    option: {
        'textTransform': 'capitalize'
    }
};

function CategoryItem({category}) {
    return(
        <option style={styles.option} value={category.toLowerCase()}>{category.toLowerCase()}</option>
    )
}

export default CategoryItem;
