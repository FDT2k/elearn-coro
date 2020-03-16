import React from 'react'
import {compose,map} from '@geekagency/composite-js'
const files = {
    "1132":{
        "_":[
            {
                title:"instructions",
                file: "http://blabla.me"
            }
        ]
    }
}

const kmap = f=>o=> Object.keys(o).map(x=>f(o[x],x))

let render_file = x=><h1>{x.title}</h1>
let render_file_list = map(render_file)
let render_level_2 = (val,key)=>(<li>{key}-{render_file_list(val)}</li>)
let t = kmap(kmap(render_level_2))(files)

export default props => {

  return (
    <div className="theme-light_elm cover just-between align-stretch">

      <div className="theme-dark_elm">
        <header className="main-header">
          <h1>Classe N°1132</h1>
        </header>
      </div>

      <section className="first-category flex flex-column just-center align-center">
        <article className="column-1">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
            </ul>
          </section>
          <button onClick={props.handleLogin}>Accéder aux cours</button>
        </article>

        <article className="column-1">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
            </ul>
          </section>
          <button onClick={props.handleLogin}>Accéder aux cours</button>
        </article>

        <article className="column-1">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
            </ul>
          </section>
          <button onClick={props.handleLogin}>Accéder aux cours</button>
        </article>

        <article className="column-1">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
            </ul>
          </section>
          <button onClick={props.handleLogin}>Accéder aux cours</button>
        </article>

        <article className="column-1">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
            </ul>
          </section>
          <button onClick={props.handleLogin}>Accéder aux cours</button>
        </article>

        <article className="column-1">
          <header>
            <h2>Grande Section</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic voluptate labore modi accusamus, soluta nam vero, culpa cum esse eos error.</p>
          </header>
          <section>
            <h4>Dossier</h4>
            <ul>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
              <li><a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">fichier à télécharger</a></li>
            </ul>
          </section>
          <button onClick={props.handleLogin}>Accéder aux cours</button>
        </article>

      </section>

      <footer className="footer">
        <div>
          <p>2020 - Designed with love, cocoa and coffe by <a rel="noopener noreferrer" target="_blank" href="https://www.geekagency.ch">GeekAgency</a> - Switzerland</p>
        </div>
      </footer>

    </div>

  )

}
