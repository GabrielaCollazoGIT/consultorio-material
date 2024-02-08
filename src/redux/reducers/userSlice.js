// el fichero es el que tiene la logica del estado de la app, contiene los slices(porciones de estado)
import { createSlice } from "@reduxjs/toolkit";

const initialState = { // estado inicial de nuestro sliceUser...
    token:"",
    rol:""
};

export const userSlice = createSlice({  
    // le colocamos nombre a esta porcion para poder identificarlo en los distintos componentes de nuestra app
    name: 'user.',
    initialState, // y le pasamos el estado inicial
    reducers: { // esto es lo que cambia con el redux definido donde tengo la funcion reducer q es un swich con varios casos dependiendo de las actions
        //aca ponemos las acciones que queremos que modifiquen los estados y redux-toolkit va a crear acciones que se pueden despachar desde los componentes
        // de nuestra app de forma automatica, sin tener que crearla
        
            //dentro del addUser modificamos ese estado...(rol, token)
        addUser: (state, action) => { // esta es un reducer que recibe (o accion)
                // recibe el estado, y la accion con su payload (sus datos)
        // ...state (antes debiamos tener una copia del estado, con el spredOperator--- con toolkid, no es necesario, lo hace automaticamente con una libreria que utiliza x detras(immer))
                const {rol,token} = action.payload; // de este payload obtengo el token y el rol (que no lo obtuvimos todavia)
                state.token = token;
                state.rol = rol;
            
            },
            //aca puedo tener otro reducer ej:
        changeToken: (state, action) =>{
                state.token = action.payload; // en este caso no hago destructuring xq solo voy a recibir en el payload el token

        }

    
    }
})

export const {addUser, changeToken} = userSlice.actions // son las actions para utilizarlas, no es lo mismo que los reducers que acabamnos de configurar, estas se crean solas
export default userSlice.reducer; // aca si exporto el reducer.... que lo importamos en la store, este ultimo a su vez va ser importado en el index para usarlo con el provider


// useSelector() es para lectura de la informacion, y se utiliza cuando se monta el componente, lee el estado actual de la variable
// useDispatch() se utiliza para la escritura de la informacion, es decir para modificarla, envia la informacion a un reducer( ej, changeToken) para que modifique si estado


// ej
/* En el componente donde quiero trabajar....
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Uno = () => {
    const dipatch = useDispatch();
    const tokenActual = useSelector(state => state.user.token); = leo el valor actual del token desde el state

    const modificar = () => {
        dispatch(changeToken('asdasdqweqwe213213asa)); = le cargo el nuevo state con este metodo...
    }

    <button onClick={modificar}> Modificar token </button>


}
 */