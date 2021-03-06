import { createSelector } from 'reselect'

const selectCart = (state) => state.cart

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems)

// Number of shopping cart items
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
)

// Toggle cart hidden
export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden)

// Select total payment
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
    )
)