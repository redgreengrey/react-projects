import React from 'react'
import ProductsRow from "./ProductsRow";
import {SHOPPING_CART_PAGE} from "./App";
import PropTypes from 'prop-types';

class ProductsList extends React.Component {
    render() {
        const {changePage, changeOrderItemsCount, orderItems, products, currentPage} = this.props;

        return (
            <div>
                <div className='row'>
                    <span className='col'>Название</span>
                    <span className='col p-0'>Цена</span>
                    <span className='col'>Количество</span>
                    <span className='col'> </span>
                </div>
                <hr/>
                {
                    products.map((product, idx) => {
                        let orderItem = orderItems.find(function (item) {
                            return item.product === product;
                        });
                        return <ProductsRow
                            changeOrderItemsCount={changeOrderItemsCount}
                            key={idx}
                            item={product}
                            count={!!orderItem ? orderItem.count : 0}
                            currentPage={currentPage}
                        />
                    })
                }
                <div className='d-flex justify-content-between'>
                    <button onClick={e => changePage(SHOPPING_CART_PAGE)} className='btn btn-dark'>
                        В корзину
                    </button>
                </div>
            </div>
        )
    }
}

ProductsList.propTypes = {
    changeOrderItemsCount: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    orderItems: PropTypes.array.isRequired,
    changePage: PropTypes.func.isRequired,
    currentPage: PropTypes.string
};

export default ProductsList;