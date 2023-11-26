import {
    getDatabase,
    ref,
    onValue,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const db = getDatabase();
for (let i = 1; i <= 12; i++) {
    const getData = ref(db, `1/Producto${i}/`);
    let $products = document.querySelector("#products");
    onValue(getData, (snapshot) => {
        const value = snapshot.val();
        $products.innerHTML += ` 
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 textColor align-items-center" id="product">
            <img src=${value.Img} width="200px" height="auto" class="border30";>
            <h5 style="margin-bottom: 0%;">${value.Name}</h5>
            <img src="${value.Rating}">
            <p style="margin-bottom: 0%;">${value.Price}</p>  
            <p>
            <button type="button" class="btn mybtnProducts my-3">Añadir al <br> carrito</button>
            </p>
            </div>
        `;
    });
}
