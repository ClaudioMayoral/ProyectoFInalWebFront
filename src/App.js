import React, {useState,useEffect} from 'react';
import {Routes,Route,Link,Outlet} from 'react-router-dom';


function Encabezado(){
  return(
    <div>
      <nav className="nav">
        <span className="nav-link"><Link to="/">Home</Link></span>  
        <span className="nav-link"><Link to="/usuario">Usuario</Link></span>
        <span className="nav-link"><Link to="/vuelo">Vuelo</Link></span> 
        <span className="nav-link"><Link to="/boletos">Boletos</Link></span>   
      </nav>    
    </div>
  )
}

function Menu(){
  return(
    <div>
      <h2>Muchas gracias por usar la aplicación. Favor de elegir una opción</h2>
    </div>
  )
}

function MenuUsuario(){
  return(
    <div>
      <nav className="nav">
        <span className="nav-link"><Link to="/usuario/actualizarusuario">Actualizar Usuario</Link></span>     
        <span className="nav-link"><Link to="/usuario/info">Info del Suaurio</Link></span>
        <span className="nav-link"><Link to="/usuario/registrar">Registrar Usuario</Link></span>            
      </nav>
      <Outlet/>       
    </div>
  )
}

function MenuVuelo(){
  return(
    <div>
      <nav className="nav">
        <span className="nav-link"><Link to="/vuelo/info">Información del Vuelo</Link></span>     
        <span className="nav-link"><Link to="/vuelo/crearvuelo">Crear Vuelo</Link></span>
        <span className="nav-link"><Link to="/vuelo/actualizarvuelo">Actualizar Vuelo</Link></span>            
      </nav>
      <Outlet/>       
    </div>

  )
}

function MenuBoleto(){
  return(
    <div>
      <nav className="nav">
        <span className="nav-link"><Link to="/boletos/crearboleto">Crear Boleto</Link></span>     
        <span className="nav-link"><Link to="/boletos/eliminarboleto">Eliminar Boleto</Link></span>
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
  //ComponentDidMount
  useEffect(()=>{
    console.log("ComponentDidMount en componente función")
  },[])
  return(
    <div>
      <h1>Home</h1>

    </div>
  )
}

class Usuario extends React.Component {

  constructor(){
    super()
    this.state={
      boletos:[],
      id: null,
      nombre:"",
      correo:"",
      dob:""
    }
  }

  componentDidMount(){
  }

  info(info){
    this.conseguirDatos(info)
    this.conseguirBoletos(info)
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/usuario/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            nombre: datos.nombre,
            correo: datos.correo,
            dob: datos.dob
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })

  }


  async conseguirBoletos(info){
    fetch(`http://localhost:8080/boleto/usuario/${info}`)
      .then(res=>res.json())
        .then(boletos=>{
          console.log(boletos)
          this.setState({
            boletos: boletos
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }



  render(){
    const listItems = this.state.boletos.map((number) =>
      <li>{number.id_vuelo}</li>
    );
    return(
      <div>
        <h1>Vista del usuario</h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.info.bind(this,this.state.id)} className="btn btn-primary">Buscar Usuario</button>
        <p>Nombre: {this.state.nombre}</p>
        <p>Correo: {this.state.correo}</p>
        <p>ID's de los Vuelos del cliente</p>
        {listItems}
      </div>
    )
  }

}



class Vuelo extends React.Component{

  constructor(){
    super()
    this.state={
      id: null,
      lugares:null,
      paisOrigen:"",
      paisDestino:"",
      horaLlegada:"",
      horaSalida:""
    }
  }


  componentDidMount(){
    
  }


  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/vuelo/crear',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          lugares: this.state.lugares,
          paisOrigen: this.state.paisOrigen,
          paisDestino: this.state.paisDestino,
          horaLlegada: this.state.horaLlegada,
          horaSalida: this.state.horaSalida
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
      }
      
  }

  render(){
    return(
      <div>
        <h1>Pon los siguientes datos: </h1>
        <p>lugares: </p>
        <input value={this.state.lugares} onChange={(e)=>this.setState({...this.state,lugares:e.target.value})}></input>
        <p>Pais de Origen:</p>
        <input value={this.state.paisOrigen} onChange={(e)=>this.setState({...this.state,paisOrigen:e.target.value})}></input>
        <p>Pais Destino:</p>
        <input value={this.state.paisDestino} onChange={(e)=>this.setState({...this.state,paisDestino:e.target.value})}></input>
        <p>Fecha y Hora de salida:</p>
        <input value={this.state.horaSalida} onChange={(e)=>this.setState({...this.state,horaSalida:e.target.value})}></input>
        <p>Fecha y Hora de llegada:</p>
        <input value={this.state.horaLlegada} onChange={(e)=>this.setState({...this.state,horaLlegada:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Crear Usuario</button>
        <p></p>
        <p>Tu vuelo es: {this.state.id}</p>
      </div>
    )
  }
}

class ActualizarUsuario extends React.Component{

  constructor(){
    super()
    this.state={
      info:null,
      id: null,
      nombre:"",
      correo:"",
      dob:""
    }
  }


  componentDidMount(){
    
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/usuario/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            nombre: datos.nombre,
            correo: datos.correo,
            dob: datos.dob
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }


  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch(`http://localhost:8080/usuario/actualizar/${this.state.id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          nombre: this.state.nombre,
          correo: this.state.correo,
          dob: this.state.dob,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
      }
      
  }

  render(){
    return(
      <div>
        <h1>Pon los siguientes datos: </h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.conseguirDatos.bind(this,this.state.id)} className="btn btn-primary">Buscar Usuario</button>
        <p>Nombre:</p>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,nombre:e.target.value})}></input>
        <p>Correo:</p>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,correo:e.target.value})}></input>
        <p>Fecha de Nacimiento:</p>
        <input value={this.state.dob} onChange={(e)=>this.setState({...this.state,dob:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Actualizar Usuario</button>
        <p></p>
      </div>
    )
  }

}

class ActualizarVuelo extends React.Component{
  constructor(){
    super()
    this.state={
      id: null,
      lugares:null,
      paisOrigen:"",
      paisDestino:"",
      horaLlegada:"",
      horaSalida:""
    }
  }


  componentDidMount(){
    
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/vuelo/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            lugares: datos.lugares,
            paisOrigen: datos.pais_origen,
            paisDestino: datos.pais_destino,
            horaLlegada: datos.hora_llegada,
            horaSalida: datos.hora_salida
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }

  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch(`http://localhost:8080/vuelo/actualizar/${this.state.id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          lugares: this.state.lugares,
          paisOrigen: this.state.paisOrigen,
          paisDestino: this.state.paisDestino,
          horaLlegada: this.state.horaLlegada,
          horaSalida: this.state.horaSalida
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
        this.setState({...this.state,lugares:null})
      }
      
  }

  render(){
    return(
      <div>
        <h1>Pon el id del vuelo: </h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.conseguirDatos.bind(this,this.state.id)} className="btn btn-primary">Buscar Usuario</button>
        <p>lugares: </p>
        <input value={this.state.lugares} onChange={(e)=>this.setState({...this.state,lugares:e.target.value})}></input>
        <p>Pais de Origen:</p>
        <input value={this.state.paisOrigen} onChange={(e)=>this.setState({...this.state,paisOrigen:e.target.value})}></input>
        <p>Pais Destino:</p>
        <input value={this.state.paisDestino} onChange={(e)=>this.setState({...this.state,paisDestino:e.target.value})}></input>
        <p>Fecha y Hora de salida:</p>
        <input value={this.state.horaSalida} onChange={(e)=>this.setState({...this.state,horaSalida:e.target.value})}></input>
        <p>Fecha y Hora de llegada:</p>
        <input value={this.state.horaLlegada} onChange={(e)=>this.setState({...this.state,horaLlegada:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Actualizar Vuelo</button>
        <p></p>
      </div>
    )
  }
  
}

class Registro extends React.Component{
  constructor(){
    super()
    this.state={
      info:null,
      id: null,
      nombre:"",
      correo:"",
      dob:""
    }
  }


  componentDidMount(){
    
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
          dob: this.state.dob,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
      }
      
  }

  render(){
    return(
      <div>
        <h1>Pon los siguientes datos: </h1>
        <p>Nombre:</p>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,nombre:e.target.value})}></input>
        <p>Correo:</p>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,correo:e.target.value})}></input>
        <p>Fecha de Nacimiento:</p>
        <input value={this.state.dob} onChange={(e)=>this.setState({...this.state,dob:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Crear Usuario</button>
        <p></p>
        <p>Tu usuario es: {this.state.id}</p>
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
            </Route>
            <Route path="/usuario" element={<MenuUsuario/>}>
              <Route index element={<Home/>}/>
              <Route path="actualizarusuario" element={<ActualizarUsuario/>}/>
              <Route path="info" element={<Usuario/>}/>
              <Route path="registrar" element={<Registro/>}/>
            </Route>
            <Route path="/vuelo" element={<MenuVuelo/>}>
              <Route index element={<Home/>}/>
              <Route path="info" element={<ActualizarUsuario/>}/>
              <Route path="crearvuelo" element={<Vuelo/>}/>
              <Route path="actualizarvuelo" element={<ActualizarVuelo/>}/>
            </Route>
            <Route path="/boletos" element={<MenuBoleto/>}>
              <Route index element={<Home/>}/>
              <Route path="crearboleto" element={<Vuelo/>}/>
              <Route path="eliminarboleto" element={<ActualizarVuelo/>}/>
            </Route>

            <Route path="*" element={<Error404/>}/>
        </Routes>
    </div>
  );
}


export default App;