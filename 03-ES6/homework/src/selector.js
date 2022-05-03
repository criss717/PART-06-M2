var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
 
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    let child=startEl.children[i];
    let elementfound= traverseDomAndCollectElements(matchFunc,child);
    resultSet=[...resultSet, ...elementfound]
    
  }
  return resultSet;
    
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0]==="#") return "id";
  if(selector[0]===".") return "class";
  for (let i = 1; i < selector.length; i++) {
    if(selector[i]===".") return "tag.class"       
  } 
  return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    var matchFunction = function (el) {
      return el.id === selector.split("#")[1];
    }
  } else if (selectorType === "class") {
    var matchFunction = function (el) {
      let classe=el.classList;
      for (let i = 0; i < classe.length; i++) {
        if(classe[i]=== selector.split(".")[1]){
          return true;
        }          
      } 
      return false;
     } 
  } else if (selectorType === "tag.class") {
    var matchFunction = function (el) {
      let classe=el.classList;
      var haveclass=false;
      for (let i = 0; i < classe.length; i++) {
        if(classe[i]=== selector.split(".")[1]){
         var haveclass= true;
        }          
      } 
      var havetag=el.tagName.toLowerCase() === selector.split(".")[0].toLowerCase();
      return haveclass && havetag;
     } 
    
    
  } else if (selectorType === "tag") {
    var matchFunction = function (el) {
      return el.tagName.toLowerCase() === selector.toLowerCase();
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
