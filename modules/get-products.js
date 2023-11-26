import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

export function showProducts(app)
{
    getNames(Productname, Productimage)
    {
        const db = getDatabase();
        set(ref(db,'1/Producto1/'),{
            Name: Productname,
            Img: Productimage
        });
    }
    console.log(Productimage, Productname);
}