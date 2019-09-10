var API_CONFIG = {
    login:['/sessions/users','post'],
    getUsername:['/sessions/username','get'],
    logout:['/sessions/users','delete'],
    register:['/users','post'],
    checkUsername:['/users/checkUsername','get'],
    getUserinfo:['/sessions/users','get'],
    getHomeCategories:['/categories/homeCategories','get'],
    getPositionAds:['/ads/positionAds','get'],
    getFloors:['/floors','get'],
    getProductsList:['/products/list','get'],
    getProductsDetail:['/products/detail','get'],
    addCarts:['/carts','post'],
    getCartsCount:['/carts/count','get'],
    getCarts:['/carts','get'],
    updateCartsChoices:['/carts/choices','put'],
    deleteCarts:['/carts','delete'],
    getOrdersProducts:['/orders/products','get'],
    addOrders:['/orders','post'],
    getOrdersList:               ['/orders/list','get'],
    getOrdersDetail:               ['/orders/detail','get'],
    updateOrdersStatus:          ['/orders/status','put'],
    addShippings:['/shippings','post'],
    deleteShippings:['/shippings','delete'],
    getShippingsList:['/shippings/list','get'],
    getShippingsDetail:['/shippings/detail','get'],
    updateShippings:['/shippings','put'],
    getPayments:                 ['/payments','get'], 
    getPaymentsStatus:           ['/payments/status','get'], 
}

module.exports = {
    API_CONFIG
}