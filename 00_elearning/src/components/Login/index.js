import React from 'react'



export default props => {

  return (
    <div className="login">
      <div className="theme-dark">
        <header className="main-header  flex just-center">
          <h1>Elearn-20</h1>
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
