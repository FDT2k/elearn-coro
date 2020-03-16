import React from 'react'
import {compose,map} from '@geekagency/composite-js'
import Footer from '../Footer'

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

      <Footer/>

    </div>

  )

}
