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
            const payload = {
                intent: "CAPTURE",
                purchase_units:[
                    {
                        amount:{
                            currency_code: "MXN",
                            value: "400.00",
                            breakdown:{
                                item_total:{
                                    currency_code: "MXN",
                                    value: "400.00"
                                }
                            }
                        },
                        //LLENAR CON LOS DATOS DEL CARRITO DE COMPRA
                        items:[
                            {
                                name: "Figura dildo max 3",
                                description: "Esta es una figura exoplastica de 3 velocidades con 2 anillo reductores",
                                quantity: 2,
                                unit_amount:{
                                    currency_code: "MXN",
                                    value:"200.00"
                                }
                            }
                        ]
                    }
                ]
            }

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

function resultMessage(message) {
    carrito.comprarCarrito();
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
}