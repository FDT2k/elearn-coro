import React from 'react'



export default props => {

  return (
    <div className="theme-light_elm cover just-between align-stretch">

      <div className="theme-dark_elm">
        <header className="main-header">
          <h1>Classe N°1132</h1>
        </header>
      </div>

      <section className="first-category flex flex-column just-center align-start">
        <article className="1-column">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li>fichier à télécharger</li>
              <li>fichier à télécharger</li>
              <li>fichier à télécharger</li>
              <li>fichier à télécharger</li>
            </ul>
          </section>
        </article>

        <button onClick={props.handleLogin}>Accéder aux cours</button>
      </section>

      <footer className="footer">
        <div>
          <p>2020 - Designed with love, cocoa and coffe by <a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">GeekAgency</a> - Switzerland</p>
        </div>
      </footer>

    </div>

  )

}
