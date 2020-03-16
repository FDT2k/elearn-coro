import React from 'react'



export default props => {

  return (
    <div className="theme-light cover just-between align-stretch">

      <div className="theme-dark">
        <header className="main-header">
          <h1>Elearn-20</h1>
        </header>
      </div>

        <div className="theme-light contact-us">
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

                <button onClick={props.handleLogin}>Me connecter</button>
              </form>
          </section>

        </div>

        <footer className="theme-light footer">
          <div>
            <p>2020 - Designed with love, cocoa and coffe by GeekAgency - Switzerland</p>
          </div>
        </footer>

    </div>
  )

}
