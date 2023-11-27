const carrito = {
    anadir : (objecto) => {
        const currrentCarrito = window.localStorage.getItem("carrito");
        
        const carritoObj = JSON.parse(currrentCarrito);
        const articulos = carritoObj.articulos;

        let actualizado = false;

        let newArticles = articulos.map((articulo) => {
            if(articulo.ID === objecto.ID){
                
                articulo.agregados++;
                if(articulo.agregados > articulo.Storage)
                    articulo.agregados = articulo.Storage;
                actualizado = true;
            }

            return articulo;
        });

        if(!actualizado){
            //CREAR
            objecto.agregados = 1;
            newArticles = [...newArticles, objecto]
        }

        const newCarrito = {...carritoObj, articulos: newArticles}
        console.log("new Carrito: ", newCarrito);
        window.localStorage.setItem("carrito", JSON.stringify(newCarrito))
    },
    remover : (objeto) => {
        const currrentCarrito = window.localStorage.getItem("carrito");
        
        const carritoObj = JSON.parse(currrentCarrito);
        let articulos = carritoObj.articulos;

        if(articulos.lenght <= 0) return;

        let siHay = false;
        let destroy = false;

        articulos = articulos.map((articulo => {
            if(articulo.ID === objeto.ID){
                console.log("Si hay");
                siHay = true;
                articulo.agregados--;
                if(articulo.agregados <= 0){ 
                    destroy = true; 
                }
            }

            return articulo;
        }));

        if(!siHay){
            console.log("No hay ese articulo");
            return;
        }
        
        if(destroy){
            console.log("Se destruyo")
            articulos = articulos.filter((articulo) => {
                return articulo.ID !== objeto.ID;
            });
        }

        const newCarrito = {...carritoObj, articulos: articulos}
        console.log("new Carrito: ", newCarrito);
        window.localStorage.setItem("carrito", JSON.stringify(newCarrito))
    },
    comprarCarrito: () => {
        window.localStorage.setItem("carrito", JSON.stringify({articulos : []}));
    },
    obtenerArticulos: () => {
        const currrentCarrito = window.localStorage.getItem("carrito");
        
        const carritoObj = JSON.parse(currrentCarrito);
        const articulos = carritoObj.articulos;
        return articulos;
    }
}

window.localStorage.setItem("carrito", JSON.stringify({articulos : []}));
export default carrito;