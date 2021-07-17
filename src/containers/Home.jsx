import React, { useState } from 'react';

import '../styles/components/Home.scss';
import InitialState from '../InitialState';
import Hero from '../components/Hero';
import Input from '../components/Input';
import Select from '../components/Select';

import PiezaPerspectiva from '../styles/images/pieza-perspectiva.png';
import indiceLocal from '../styles/images/indice-local.png';

function Home() {
  const [lumen, setLumen] = useState({ campo: "", valido: null });
  const [luminaria, setLuminaria] = useState({ campo: "", valido: null });
  const [alto, setAlto] = useState({ campo: "", valido: null });
  const [ancho, setAncho] = useState({ campo: "", valido: null });
  const [largo, setLargo] = useState({ campo: "", valido: null });
  const [utilizacion, setUtilizacion] = useState({ campo: "0.85", valido: null });
  const [mantenimiento, setMantenimiento] = useState({ campo: "0.8", valido: null });
  
  const [calculo, setCalculo] = useState(0);
  const [calculoFlujo, setCalculoFlujo] = useState(0);
  const [formUno, setFormUno] = useState(true);
  const [formDos, setFormDos] = useState(false);
  const [formFlujo, setFormFlujo] = useState(false);
  const [luminariaTotal, setLuminariaTotal] = useState(0);
  const [luminariaAncho, setLuminariaAncho] = useState(0);
  const [luminariaLargo, setLuminariaLargo] = useState(0);

  const changeLumen = (e) => {
    setLumen({ ...alto, campo: e.target.value });
  };
  const changeAlto = (e) => {
    setAlto({ ...alto, campo: e.target.value });
  };
  const changeAncho = (e) => {
    setAncho({ ...ancho, campo: e.target.value });
  };
  const changeLargo = (e) => {
    setLargo({ ...largo, campo: e.target.value });
  };
  const changeLuminaria = (e) => {
    setLuminaria({ ...utilizacion, campo: e.target.value });
  };
  const changeUtilizacion = (e) => {
    setUtilizacion({ ...utilizacion, campo: e.target.value });
  };
  const changeMantenimiento = (e) => {
    setMantenimiento({ ...mantenimiento, campo: e.target.value });
  };
  const validarAlto = () => {
    if (alto.campo.length > 0) {
      setAlto({ ...alto, valido: true });
    } else {
      setAlto({ ...alto, valido: false });
    }
  }
  const validarAncho = () => {
    if (ancho.campo.length > 0) {
      setAncho({ ...ancho, valido: true });
    } else {
      setAncho({ ...ancho, valido: false });
    }
  }
  const validarLargo = () => {
    if (largo.campo.length > 0) {
      setLargo({ ...largo, valido: true });
    } else {
      setLargo({ ...largo, valido: false });
    }
  };
  console.table(`Ambie: ${lumen.campo}, \nLumin: ${luminaria.campo}, \nAncho: ${ancho.campo}, \nLargo: ${largo.campo}, \nAlto : ${alto.campo}, \nUtili: ${utilizacion.campo}, \nMante: ${mantenimiento.campo}`)
  const calcular = (e) => {
    e.preventDefault();
    if(largo.valido && alto.valido && largo.valido ){
      const calculoUno = (parseFloat(ancho.campo) * parseFloat(largo.campo)) / (parseFloat(alto.campo) * (parseFloat(ancho.campo) + parseFloat(largo.campo)));
      setCalculo(calculoUno);
      setFormUno(false)
      setFormDos(true);
    }
  };
  const calcularFlujo = (e) => {
    e.preventDefault();
    const flujo = (parseFloat(lumen.campo) * (parseFloat(ancho.campo) * parseFloat(largo.campo))) / (parseFloat(utilizacion.campo) * parseFloat(mantenimiento.campo));
    const numLuminaria = flujo / parseFloat(luminaria.campo);
    const numLuminariaAncho = Math.sqrt( (numLuminaria * ancho.campo) / largo.campo );
    const numLuminariaLargo = (numLuminariaAncho * largo.campo) / ancho.campo;
    setCalculoFlujo(flujo);
    setLuminariaTotal(numLuminaria);
    setLuminariaAncho(numLuminariaAncho);
    setLuminariaLargo(numLuminariaLargo);

    setFormDos(false)
    setFormFlujo(true);
  };
  const reiniciar = (e) => {
    e.preventDefault()
    setFormUno(true)
    setFormDos(false)
    setFormFlujo(false);
  }

  return (
    <>
      <Hero />
      <div className="Home">
        <h2 className="Home__h2" >Calculá la iluminación mínima para tu casa, departamento u oficina.</h2>

        {formUno ?
          <form onSubmit={calcular} className="Home__form">
            <p className="Home__text" ><strong>1ro -</strong> Seleccioná el ambiente, sus medidas y luminaria.</p>
            <div className="Home__form--div">
              <img
                className="Home__img--small"
                src={PiezaPerspectiva}
                alt="Pieza en perspectiva"
              />
            </div>
            <Select 
              label="Ambiente : "
              name="lumen"
              onchange={changeLumen}
              initialstate={InitialState.IntLuminica}
              value={lumen.campo}
            />
            <Select 
              label="Luminaria : "
              name="lumen"
              onchange={changeLuminaria}
              initialstate={InitialState.Lampara}
              value={luminaria.campo}
            />
            <Input 
              label="Alto (m.): "
              name="alto"
              onchange={changeAlto}
              value={alto.campo}
              validar={validarAlto}
              valido={alto.valido}
              textError="Invalido! Altura en metros. Para fracciónes usar punto antes del decimal."
            />
            <Input 
              label="Ancho (m.): "
              name="ancho"
              onchange={changeAncho}
              value={ancho.campo}
              validar={validarAncho}
              valido={ancho.valido}
              textError="Invalido! Ancho en metros. Para fracciónes usar punto antes del decimal."
            />
            <Input 
              label="Largo (m.): "
              name="largo"
              onchange={changeLargo}
              value={largo.campo}
              validar={validarLargo}
              valido={largo.valido}
              textError="Invalido! Largo en metros. Para fracciónes usar punto antes del decimal."
            />
            <input className="Btn Primary" type="submit" value="Siguiente" />
          </form>
          : <></>
        }

        {formDos ?
            <>
              <p className="Home__text" ><strong>2do -</strong> Con el k obtenido y según color de techo, pared y piso podes buscar en la tabla el factor de utilización o usar el valor por defecto para calcular las Lamparas.</p>
              <h3>Índice del local k: {calculo.toFixed(2)}</h3>
              <div className="Home__form--div">
                <img className="Home__img" src={indiceLocal} alt="índice local k" />
              </div>
              <form onSubmit={calcularFlujo} className="Home__form">
                <Input 
                  label="Utilización: "
                  name="lumen"
                  onchange={changeUtilizacion}
                  value={utilizacion.campo}
                />
                <Input 
                  label="Mantenimiento: "
                  name="mantenimiento"
                  onchange={changeMantenimiento}
                  value={mantenimiento.campo}
                />
                <input className="Btn Primary" type="submit" value="Calcular" />
              </form>
            </>
          : <></>
        }

        {formFlujo ?
            <>
              <h2>Resultados</h2>
              <p className="Home__resultado" >
                Flujo luminoso mínimo Qt : <strong>{calculoFlujo.toFixed(0)} lux</strong>
              </p>
              <p className="Home__resultado" >
                El flujo luminosos de la lampara seleccionada es: <strong>{luminaria.campo} lux</strong> por unidad.
              </p>
              <p className="Home__resultado" >
                La iluminancia mínima para el ambiente seleccionado es: <strong>{lumen.campo} lux</strong>.
              </p>
              <p className="Home__resultado" >
                La cantidad mínima para superar el flujo luminoso esperado será de { Math.ceil(luminariaTotal)} Luminarias en la habitación, aunque la distribución ideal sera de <strong>{Math.ceil(luminariaAncho)} Luminarias</strong> ({luminariaAncho.toFixed(2)}) a lo ancho y de <strong>{Math.ceil(luminariaLargo)} Luminarias</strong> ({luminariaLargo.toFixed(2)}) a lo largo, un total de <strong>{Math.ceil(luminariaAncho) * Math.ceil(luminariaLargo)} Luminarias</strong>. 
              </p>
            </>
          : <></>
        }

        <div className="Home__form">
          <input 
            className="Btn Secondary" 
            type="button" 
            onClick={reiniciar}
            value="Reiniciar" 
          />
        </div>
      </div>
    </>
  );
}

export default Home;