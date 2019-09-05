import React from 'react';
import {PRODUCT_LIST_PAGE} from "./App";
import PropTypes from 'prop-types';
import ProductsRow from "./ProductsRow";

class ShoppingCart extends React.Component {
    getOrderTotal = function () {
        const {orderItems} = this.props;
        return orderItems.reduce((total, items) => {
            if (!!items.product) {
                total = parseInt(total) + parseInt(items.count) * parseInt(items.product.price);
            }
            return total;
        }, 0);
    };

    render() {
        const {
            orderItems,
            changeOrderItemsCount,
            clearShoppingCart,
            clearShoppingCartRow,
            changePage,
            currentPage
        } = this.props;

        if (orderItems.length === 0) {
            return (
                <div className='d-flex flex-sm-column'>
                    <div>
                        Ваша корзина пуста
                    </div>
                    <button onClick={e => changePage(PRODUCT_LIST_PAGE)} className='btn btn-dark col-6 mt-2'>
                        К списку продуктов
                    </button>
                </div>
            )
        }

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
                    orderItems.map((product, idx) => {
                        let orderItem = orderItems.find(function (item) {
                            return item.product === product;
                        });
                        return <ProductsRow
                            changeOrderItemsCount={changeOrderItemsCount}
                            key={idx}
                            item={product}
                            count={!!orderItem ? orderItem.count : 0}
                            clearShoppingCartRow={clearShoppingCartRow}
                            currentPage={currentPage}
                        />
                    })
                }
                <div className='d-flex justify-content-between'>
                    <button onClick={e => changePage(PRODUCT_LIST_PAGE)} className='btn btn-dark'>
                        К списку продуктов
                    </button>
                    <button className='btn btn-danger' onClick={e => clearShoppingCart()}>
                        Очистить корзину
                    </button>
                </div>
                <div>
                    <div>
                        <span className='font-weight-bold'>Всего:</span>
                        <span className='ml-1 '>
                            {
                                '$' + this.getOrderTotal()
                            }
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

ShoppingCart.propTypes = {
    changeOrderItemsCount: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    orderItems: PropTypes.array.isRequired,
    clearShoppingCart: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    clearShoppingCartRow: PropTypes.func.isRequired,
    currentPage: PropTypes.string
};

export default ShoppingCart;