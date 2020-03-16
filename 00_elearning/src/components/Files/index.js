import React from 'react'



export default props => {

  return (
    <div className="files theme-light_elm cover just-between align-stretch">

      <div className="theme-dark_elm">
        <header className="main-header">
          <h1>Classe n°1132</h1>
        </header>
      </div>

        <div className="contact-us">
          <section className="flex just-center">
              <form className="form_login flex flex-column">
                <div className="floating-label-wrap">
                  <input
                    type="text"
                    id="fieldMail"
                    className="floating-label-field"
                    name="email"
                    placeholder="Quel est ton code ?"
                  />
                  <label htmlFor="fieldMail" className="floating-label">
                    Quel est ton code ?
                  </label>
                </div>

                <button onClick={props.handleLogin}>Login</button>
              </form>
          </section>

        </div>

        <footer className="footer">
          <div>
            <p>2020 - Designed with love, cocoa and coffe by <a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">GeekAgency</a> - Switzerland</p>
          </div>
        </footer>

    </div>

  )

}
