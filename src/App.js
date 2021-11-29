import React, {useState,useEffect} from 'react';
import {Routes,Route,Link,Outlet} from 'react-router-dom';


function Encabezado(){
  return(
    <header>
      <nav className="nav">
        <span className="nav-link"><Link to="/">Menu</Link></span>       
      </nav>      
    </header>
  )
}

function Menu(){
  return(
    <div>
      <nav className="nav">
        <span className="nav-link"><Link to="/">Home</Link></span>
        <span className="nav-link"><Link to="/usuario">Usuario</Link></span>        
        <span className="nav-link"><Link to="/vuelo">Vuelo</Link></span>        
      </nav>
      <Outlet/>       
    </div>
  )
}


function Error404(){
  return(
    <div>
      <h1>404 (Not found)</h1>
      <Link to="/">Ir al Home</Link>
    </div>
  )
}

function Home(){

  const [state,setState]=useState({
    nombre:'',
    correo:'',
    dob:''
  })

  //ComponentDidMount
  useEffect(()=>{
    console.log("ComponentDidMount en componente función")
  },[])

  //ComponentDidUpdate
  useEffect(()=>{
    if(state.jugador!==''){
      console.log("ComponentDidUpdate en componente función")
    }
  })

  //render
  console.log(state)
  return(
    <div>
      <h1>Home</h1>

    </div>
  )
}

function Vuelo(){
  return(
    <div>
      Puntajes del juego
    </div>
  )
}


class Juego extends React.Component{
  constructor(){
    super()
    this.state={
      info:null,
      nombre:"",
      correo:"",
      dob:""
    }
  }

  componentDidUpdate(){
    console.log("compDidUpdate")
  }

  componentDidMount(){
    fetch('http://localhost:8080/usuario/2')
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            nombre: datos,
            correo: datos,
            dob: datos
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }

  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/usuario/crear',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          nombre: this.state.nombre,
          correo: this.state.correo,
          dob: this.state.dob
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      console.log(data)
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <h1>Usuario</h1>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,nombre:e.target.value})}></input>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,correo:e.target.value})}></input>
        <input value={this.state.dob} onChange={(e)=>this.setState({...this.state,dob:e.target.value})}></input>
        <p>Nombre: {this.state.nombre}</p>
        <p>correo: {this.state.correo}</p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Buscar Usuario</button>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Consume POST</button>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
        <h1>Aeropuerto</h1>
        <Encabezado/>
        <Routes>
            <Route path="/" element={<Menu/>}>
              <Route index element={<Home/>}/>
              <Route path="usuario" element={<Juego/>}/>
              <Route path="vuelo" element={<Vuelo/>}/>
            </Route>

            <Route path="*" element={<Error404/>}/>
        </Routes>
    </div>
  );
}


export default App;