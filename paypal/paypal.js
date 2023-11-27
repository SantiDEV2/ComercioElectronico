import carrito from "./carrito.js";

window.paypal.Buttons({
    async createOrder(){
        try{
            const auth = "AcvWQv75zduFBZtMCEDsU5CPx1v_zXt8TJJjSY-e_iprEqRPH-zu209R-g2bsuvQ4DXLNssM3Vws0IjE:EMWyuKJl-gp0YLnFrPD7HD-6j1tnq4c1sXwiz-HHy2UxKeqxU2juCQ010-F3mJW6IaCdnKYuwG9-n4W8";

            const auth64 = btoa(auth);

            const responseAuth = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
                method: "POST",
                body: "grant_type=client_credentials",
                headers: {
                  "Content-Type" : 'application/x-www-form-urlencoded',
                  Authorization: `Basic ${auth64}`
                },
              });
              
            const dataAuth = await responseAuth.json();
            const accessToken = dataAuth.access_token;
            console.log(accessToken);

            //HACER QUE AGARRE EL CARRITO DE COMPRAS
            const payload = getPayload();

            const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload)
            })
            const json = await response.json();
            console.log(json)
            return json.id;
        }catch(e){            
            resultMessage(`No se puso inicializar el checkout...<br><br> ${e}`)
            console.warn("NO SE PUDO INCIALIZAR")
            console.warn(e)
            return;
        }
    },

    async onApprove(data, actions){
        window.location.replace("http://127.0.0.1:5500/index.html");
    },

    style: {
        layout: 'vertical',
        color:  'gold',
        shape:  'pill',
        label:  'paypal'
    }
}).render('#paypal-button-container');

function getPayload(){
    const articulos = carrito.obtenerArticulos();
    
    let payload = {
        intent: "CAPTURE",
        purchase_units:[]
    }

    const items = articulos.map((articulo) => {
        return{
            
            name: articulo.Name,
            description: articulo.Description,
            quantity: articulo.agregados,
            unit_amount:{
                currency_code: "MXN",
                value:articulo.Price
            }
            
        }
    });
    
    let totalPrice = 0;
    articulos.forEach((articulo) => {
        totalPrice += articulo.Price * articulo.agregados;
    })

    console.log(totalPrice);

    payload.purchase_units = [{
        amount:{
            currency_code: "MXN",
            value: totalPrice,
            breakdown:{
                item_total:{
                    currency_code: "MXN",
                    value: totalPrice
                }
            }
        },
        items
    }]

    
    console.log(payload);

    return payload;
}

function resultMessage(message) {
    carrito.comprarCarrito();
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
}