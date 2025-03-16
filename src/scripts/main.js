
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element);

//Al acabar el proyecto eliminar esto y poner en cada elemento display none
//----------------------------- OCULTACION DEL INDICES ------------------------------
const $all_Navs = $$('.nav-main');

// Inicialmente, ocultamos todos los elementos con estas clases

$all_Navs.forEach(element => element.style.display = 'none');

document.querySelectorAll('.toggle-arrow').forEach((arrow) => {
  arrow.addEventListener('click', function () {
    // Encuentra el `<header>` correspondiente al clic
    const header = this.closest('.header-NavMain');
    
    // Extrae la clase modificadora y la ajusta para el <nav>
    const modClass = Array.from(header.classList)
      .find(cls => cls.startsWith('header-NavMain--'))
      .replace('header-NavMain--', 'nav-main--');

    // Busca el <nav> correspondiente
    const nav = document.querySelector(`.nav-main.${modClass}`);

    // Si no encuentra el <nav>, arroja un error amigable
    if (!nav) {
      console.error(`No se encontró un <nav> con la clase: .nav-main.${modClass}`);
      return;
    }

    // Alterna la visibilidad del <nav>
    if (nav.style.display === 'none' || nav.style.display === '') {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }
  });
});

//----------------------------- OCULTACION DE LOS SUB-SECTION ------------------------------
const $all_H4 = $$('.chaptrSubSect__titleH4');
const $all_P_Pre_Ul_li = $$('.chaptrSubSect__p, .chaptrSubSect__console, .chaptrSubSect__ul, .chaptrSubSectUl__li, .chaptrSubSect__table, .chaptrSubSect__img');

// Inicialmente, ocultamos todos los elementos con estas clases
$all_P_Pre_Ul_li.forEach(element => element.style.display = 'none');

$all_H4.forEach(h4 => 
  h4.addEventListener('click', ({ target }) => {
    const sectTargt = target.closest('.chaptrSubSect');
    const elementsToToggle = sectTargt.querySelectorAll('.chaptrSubSect__p, .chaptrSubSect__console, .chaptrSubSect__ul, .chaptrSubSectUl__li, .chaptrSubSect__table, .chaptrSubSect__img');
    
    // Alternar la visibilidad de los elementos
    elementsToToggle.forEach(element => 
      element.style.display = element.style.display === 'none' ? 'block' : 'none'
    );

    // Alternar el icono en el ::before
    if (target.classList.contains('open')) {
      target.classList.remove('open');
    } else {
      target.classList.add('open');
    }
  })
);


//----------------------------- ESTILACION CONSOLA -----------------------------------
function resaltarPalabras() {
  const elements = document.querySelectorAll('pre.wScript');
  elements.forEach(el => {
    el.innerHTML = el.innerHTML
    .replace(/(&lt;|<|&gt;|>|=>|=&gt;|\+|\-|\?| : |\!|\=|\.)/g, '<span class="roj1">$1</span>')
    .replace(/(\s)(&&|&amp;&amp;|\|\||&vert;&vert;)(\s)/g, '$1<span class="viol2">$2</span>$3')
    .replace(/([(){}])/g, '<span class="turq1">$1</span>') //(){}[]
    .replace(/[\[\]]/g, '<span class="turq1">$&</span>')
    .replace(/\b(let|const|var)\b/g, '<span class="viol2">$1</span>') //const|let|var
    .replace(/@(\w+)/g, '<span class="mari3">$1</span>')
    .replace(/\b(for|forEach|switch|if|else|get|set|typeof|bind|constructor|add|has|revocable|eval|alert|confirm|prompt|Event|fetch|XMLHttpRequest|parseFloat|parseInt|isNaN|isFinite|BigInt|while|Boolean)\b/g, '<span class="mari3">$1</span>') //funciones
    .replace(/\b(apply|length|log|getElementById|querySelector|querySelectorAll|getElementByTagName|getElementsByTagName|getElementByClassName|getElementsByClassName|getElementsByName|matches|closest|createElement|append|appendChild|createTextNode|createComment|classList|from|className|addEventListener|onclick|removeEventListener|dispatchEvent|warn|debug|then|toFixed|round|trunc|ceil|floor|random|startsWith|endsWith|replaceAll|codePointAt|toLowerCase|toUpperCase|localeCompare|valueOf|toString)\b/g, '<span class="turq1">$1</span>')  //métodos
    .replace(/\b(true|false|undefined|null|Infinity|NaN)\b/g, '<span class="lim3">$1</span>')
    .replace(/`([^`]*)`/g, '<span class="lim1">\`$1\`</span>')
    .replace(/'([^']*)'/g, '<span class="lim1">\'$1\'</span>')
    .replace(/(?<!\S)(return|continue;|break|break;|new|throw|of|instanceof|debugger;|return;)(?!\S)/g, '<span class="fuc2">$&</span>')  //keys
    .replace(/(?<!\S)(function|class)(?!\S)/g, '<span class="verd1">$&</span>')
    .replace(/(\w+:\s)/g, '<span class="verd2">$1</span>') //ObjProperties
    .replace(/(_\w+)/g, '<span class="verd2">$1</span>')
    .replace(/\b(this|Array|Error|Object|console|Proxy|Reflect|Map|Set|WeakMap|document|body|HTMLBodyElement|Math)\b/g, '<span class="huev3">$1</span>')   //Objetos
    .replace(/·(\w+)/g, '<span class="azu2">$1</span>')  //variables
    .replace(/•(\w+)/g, '<span class="gris2">$1</span>')  //Params
    .replace(/º(\w+)/g, '<span class="verd2">$1</span>')  //objProp con punto antes
    .replace(/ç(\w+)/g, '<span class="huev3">$1</span>')   //Objetos
    .replace(/ª(\w+)/g, '<span class="turq1">$1</span>')   //Objetos
    .replace(/¬(\w+)/g, '<span class="nar1">$1</span>')   //nums
    .replace(/#(\w+)/g, '<span class="verd1">$1</span>')    //variables en scopes funcs ifs fors
    .replace(/∞(?:<span[^>]*>)?(\w+)(?:<\/span>)?/g, '<span class="reset">$1</span>')
    .replace(/\/\*(.*?)\*\//g, '<span class="gris1">// $1</span>')
    .replace(/\/\s*\º\s*(.*?)\s*\º\s*\//g, function(match, content) {
      // 2. Eliminar cualquier <span> con cualquier clase dentro del contenido
      content = content.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');

      // 3. Aplicar color verde al contenido
      return `<span class="verde">${content}</span>`;
    });

  });
}
document.addEventListener('DOMContentLoaded', resaltarPalabras);

// ------------------------------ PRUEBAS --------------------------

