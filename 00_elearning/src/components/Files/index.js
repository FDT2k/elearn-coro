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
    <div className="files">

      <div className="theme-dark">
        <header className="main-header  flex just-center">
          <h1>Classe n°1132</h1>
        </header>
      </div>
        {t}
        {

            Object.keys(files).map(file=>{
                let cat = files[file]
                return Object.keys(cat).map(c=>{
                    let items = files[file][c]
                    return items.map(item=>{
                        console.log(item)
                        return <li>{item.title}</li>
                    })
                })
            })
        }
      <section className="theme-light">
        <div>
          <button onClick={props.handleLogin}>Login</button>
        </div>
      </section>
    </div>

  )

}
