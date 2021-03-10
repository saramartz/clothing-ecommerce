import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'

import CollectionCard from '../../components/collection-card/collection-card.comp'

import './collection.styles.scss'

const CollectionPage = ({ collection, whatever }) => {
    const { title, items } = collection
    whatever()
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map((item) => (
                    <CollectionCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
    whatever: () => console.log('Im getting caaaaalled'),
})

export default connect(mapStateToProps)(CollectionPage)
