
var sass = require('node-sass');



  sass.render({file: "./src/sass/style.scss"}, (...args)=>{

      console.log(args[1].css.toString('utf8'))

  } )
