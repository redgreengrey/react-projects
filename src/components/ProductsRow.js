import React from 'react';
import PropTypes from 'prop-types';
import {PRODUCT_LIST_PAGE} from "./App";

class ProductsRow extends React.Component {
    render() {
        const {item, count, changeOrderItemsCount, clearShoppingCartRow, currentPage} = this.props;
        if (currentPage === PRODUCT_LIST_PAGE) {
            return (
                <div className="row">
                    <span className="col">{item.name}</span>
                    <span className="col">{'$' + item.price}</span>
                    <span className="col"> {count} </span>
                    <span className="col-3">
                    <button
                        className="btn btn-secondary ml-1"
                        onClick={e => changeOrderItemsCount(1, item)}
                    >
                        +
                    </button>
                </span>
                </div>
            )
        } else {
            return (
                <div className='row'>
                    <span className='col'>{item.product.name}</span>
                    <span className='col'>{'$' + item.product.price}</span>
                    <span className='col'>{item.count}</span>
                    <span className='col-3'>
                    <button
                        className='btn btn-secondary'
                        onClick={e => changeOrderItemsCount(-1, item.product)}
                    >
                        -
                    </button>
                    <button
                        className='btn btn-danger ml-1'
                        onClick={e => clearShoppingCartRow(item.product)}
                    >
                        &times;
                    </button>
                </span>
                </div>
            )
        }
    }
}

ProductsRow.propTypes = {
    changeOrderItemsCount: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.string,
    clearShoppingCartRow: PropTypes.func
};

export default ProductsRow;