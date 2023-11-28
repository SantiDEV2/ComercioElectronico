import { app } from "./modules/config-base.js";
import { authEmail } from "./modules/email-auth.js";
import { authGoogle } from "./modules/google-auth.js";
import { shoppingCart } from "./modules/shoppingcart.js";

authEmail(app);
authGoogle(app);
shoppingCart(app);

document.addEventListener("click", (e)=>{
    if(e.target.matches("input"))
    {
        let pageNum = e.target.name;
        localStorage.setItem("Numpage", pageNum);
    }
})