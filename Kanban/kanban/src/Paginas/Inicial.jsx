import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom"; //colocou porq o quadro pode mudar
export function Inicial(){
    return(
        <>
            <BarraNavegacao/>
            <Cabecalho/>
            <Outlet/>
        </>
    )
}