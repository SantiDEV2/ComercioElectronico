/* import carrito from "../paypal/carrito.js" */

export function shoppingCart(app) {
    let $displayCart = document.querySelector("#displayCart")
    document.addEventListener("click", (e) => {
        if (e.target.matches("#shoppingCart")) {
            console.log(true);
            console.log($displayCart.classList);
            $displayCart.classList.remove("d-none");
        }
        else {
            $displayCart.classList.add("d-none");
        }
    })
}