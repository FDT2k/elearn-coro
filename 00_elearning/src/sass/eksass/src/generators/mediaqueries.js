const SMALL_PHONE_MAX = 320;
const MEDIUM_PHONE_MAX= 375;
const LARGE_PHONE_MAX= 425;
const SMALL_TABLET_MAX= 1024;
const SMALL_COMPUTER_MAX= 1280;
const LARGE_COMPUTER_MAX= null;


const ORIENT_VERT = 1;
const ORIENT_HORIZ = 2;

const UNIT_PX='px'

const sizes = {
  phone: [
    {
      p:'small',
      r:{
        "min-width":0,
        "max-width":SMALL_PHONE_MAX,
      }
    }, /*iphone 3,4,4s*/
    {
      p:'medium',
      r:{
        "min-width":SMALL_PHONE_MAX+1,
        "max-width":MEDIUM_PHONE_MAX,
      }
    },
    {
      p:'large',
      r:{
        "min-width":MEDIUM_PHONE_MAX+1,
        "max-width":LARGE_PHONE_MAX,
      }
    }
    ,
    {
      p:'small',
      s:'and-up',
      r:{
        "min-width":0,
      }
    },

    {
      p:'medium',
      s:'and-up',
      r:{
       "min-width":SMALL_PHONE_MAX+1,
      }
    },{
      p:'large',
      s:'and-up',
      r:{
       "min-width":MEDIUM_PHONE_MAX+1,
      }
    },
  ],
  tablet: [
    {
      p:'small',
      r:{
        "min-width":LARGE_PHONE_MAX+1,
        "max-width":SMALL_TABLET_MAX,
      }
    },
    {
      p:'small',
      s:'and-up',
      r:{
        "min-width":LARGE_PHONE_MAX+1,
      }
    },
  ],
  computer:[
    {
      p:'small',
      r:{

        "min-width":SMALL_TABLET_MAX+1,
        "max-width":SMALL_COMPUTER_MAX,
      }
    },
    {
      p:'small',
      s:'and-up',
      r:{

        "min-width":SMALL_TABLET_MAX+1,
      }
    },
    {
      p:'medium',
      r:{
        "min-width":SMALL_COMPUTER_MAX+1,
        "max-width":SMALL_COMPUTER_MAX
      }
    },
    {
      p:'medium',
      s:'and-up',
      r:{
        "min-width":SMALL_COMPUTER_MAX+1,
      }
    },
  ],
}


const make_mixin = (suffix,prefix,rules)=>{

}

const kw = [
  'and','or'
]

const gen_mq_rule = (o) => {
  //let rule = `(min-width: ${mq.}px) and (max-width: 375px)`;
  return Object.keys(o).reduce( (acc,key)=>{

    if(o[key] !== null){
      if(kw.indexOf(key.toLowerCase()) > -1){
        acc.push(key.toLowerCase());
        acc.push('('+gen_mq_rule(o[key])+')');
      }else{
        acc.push('and')
        acc.push (`(${key}: ${o[key]}px)`)
      }
      console.log(acc)
    }
    return acc;
  },[]).join(' ')
}

let res = Object.keys(sizes).map(item=>{
  let todo = sizes[item];
  return todo.map ( mq => {
    let s = mq.s || 'strict';
    let p = mq.p || '';
    let name = `mq-${p}-${item}-${s}`;
    let rule = gen_mq_rule(mq.r);
    return `@mixin ${name} {
      @media screen ${rule} { @content; };
    }`
  }).join('\n');
}).join('\n')


console.log(res)
