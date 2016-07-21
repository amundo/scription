class Scription {
  label(fields, values){ 
    var labeled = {};
  
    var isDotted = field => field.includes('.') ;

    // handle dotted fields
    fields.forEach((field, i) => {
      var value = values[i];
  
      if(isDotted(field)){ 
        var outer = field.split('.')[0],
            inner = field.split('.')[1];
        if( !(outer in labeled) ){ 
          labeled[outer] = {} ;
          labeled[outer][inner] = value;
        } else { 
          labeled[outer][inner] = value};
      } else { 
        labeled[field] = value;
      }
    })
    return labeled ;
  }

  parseIntoStanzas(input){
    return input
      .trim()
      .split(/\n[\n]+/)
      .map(stanza => stanza.split(/\n/g))
  }

  parse(schema, input){
    var data = {};
    var input = input.trim();
    var stanzas = this.parseIntoStanzas(input);
  
    var schema = schema
      .trim()
      .split(/\n/)
      .map(String.trim);
  
    data = stanzas.map(stanza => {
      return this.label(schema, stanza)
    })
  
    return data;
  
  }

}
