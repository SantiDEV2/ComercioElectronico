import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const db = getDatabase();

if(document.querySelector("#products"))
{
    let $products = document.querySelector("#products");
    let $template = "";
    
    document.addEventListener("click", (e) => {
        if (e.target.matches("#valueBtn")) {
            $products.innerHTML = $template;
            setPage(e.target.value);
        }
    });

    const setPage = (page) => {
        const data = ref(db, `${page ?? localStorage.getItem("Numpage")}/`);
        onValue(data, (snapshot) => {
            const items = snapshot.val();
            updateWebPage(items);
        });
    };
    
    setPage();
    
    const updateWebPage = (items) => {
        Object.values(items).forEach((item) => {
            $products.innerHTML += ` 
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 textColor align-items-center" id="product">
            <img src=${item.Img} width="200px" height="auto" class="border30";>
            <h5 style="margin-bottom: 0%;">${item.Name}</h5>
            <img src="${item.Rating}">
            <p style="margin-bottom: 0%;">${item.Price}</p>  
            <p>
            <button type="button" class="btn mybtnProducts my-3">Añadir al <br> carrito</button>
            </p>
            </div>
            `;
        });
    };
}
