import { app } from "./modules/config-base.js";
import { authGoogle } from "./modules/google-auth.js"

authGoogle(app);
