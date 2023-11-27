import { app } from "./modules/config-base.js";
import { authEmail } from "./modules/email-auth.js";
import { authGoogle } from "./modules/google-auth.js";

authEmail(app);
authGoogle(app);

document.addEventListener("click", (e)=>{
    if(e.target.matches("input"))
    {
        let pageNum = e.target.name;
        localStorage.setItem("Numpage", pageNum);
    }
})