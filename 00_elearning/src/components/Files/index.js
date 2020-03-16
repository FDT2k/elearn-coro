import React from 'react'



export default props => {

  return (
    <div className="files">
      
      <div className="theme-dark">
        <header className="main-header  flex just-center">
          <h1>Classe n°1132</h1>
        </header>
      </div>
      <section className="theme-light">
        <div>
          <button onClick={props.handleLogin}>Login</button>
        </div>
      </section>
    </div>

  )

}
