import React from 'react'
import ShoppingCart from "./ShoppingCart";
import ProductsList from "./ProductsList";
import {productsFromWarehouse, createOrder} from "../utils/utils";

export const PRODUCT_LIST_PAGE = 'ProductsList';
export const SHOPPING_CART_PAGE = 'ShoppingCart';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: PRODUCT_LIST_PAGE,
            products: productsFromWarehouse(),
            order: createOrder()
        };
    }

    render() {
        const {order, products, currentPage} = this.state;
        return (
            <div className="main-block">
                {currentPage === PRODUCT_LIST_PAGE ? <h1>Список товаров</h1> : <h1>Корзина</h1>}
                {
                    currentPage === PRODUCT_LIST_PAGE && (
                        <ProductsList
                            changeOrderItemsCount={this.changeOrderItemsCount()}
                            products={products}
                            orderItems={order.items}
                            changePage={this.changePage()}
                            currentPage={currentPage}
                        />
                    )
                }
                {
                    currentPage === SHOPPING_CART_PAGE && (
                        <ShoppingCart
                            changeOrderItemsCount={this.changeOrderItemsCount()}
                            products={products}
                            orderItems={order.items}
                            clearShoppingCart={this.clearShoppingCart()}
                            changePage={this.changePage()}
                            clearShoppingCartRow={this.clearShoppingCartRow()}
                            page={currentPage}
                        />
                    )
                }

            </div>
        )
    }

    changePage = function () {
        const those = this;

        return function (page) {
            those.setState({
                currentPage: page
            });
        }
    };

    changeOrderItemsCount = function () {
        const {currentPage, order} = this.state;
        const those = this;
        return function (increase, product) {
            if (currentPage === PRODUCT_LIST_PAGE || currentPage === SHOPPING_CART_PAGE) {
                let itemIndex = order.items.findIndex(function (item) {
                    return product === item.product;
                });

                if (itemIndex >= 0) {
                    let items = order.items;
                    items[itemIndex].count += increase;
                    if (items[itemIndex].count <= 0) {
                        items.splice(itemIndex, 1);
                    }

                    those.setState({
                        order: {
                            ...order,
                            items: items
                        }
                    });
                } else if (increase > 0) {
                    those.setState({
                        order: {
                            ...order,
                            items: [
                                ...order.items,
                                {
                                    product: product,
                                    count: increase
                                }
                            ]
                        }
                    });
                }
            }
        };
    };

    clearShoppingCart = function () {
        const those = this;
        return function () {
            those.setState({
                order: createOrder()
            });
        }
    };

    clearShoppingCartRow = function () {
        const {currentPage, order} = this.state;
        const those = this;
        return function (product) {
            if (currentPage === SHOPPING_CART_PAGE) {
                let itemIndex = order.items.findIndex(function (item) {
                    return product === item.product;
                });
                let items = order.items;
                items.splice(itemIndex, 1);
                those.setState({
                    order: {
                        items: [...items]
                    }
                });
            }
        }
    };
}

export default App;