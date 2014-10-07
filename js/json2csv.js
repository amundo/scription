function json2csv(data, fieldnames){
  
  data.map(function(d){
    return _.pick(d, fieldnames)
  })
  
  var inorder = [fieldnames];
  
  data.forEach(function(d){
    var line = [];
    fieldnames.forEach(function(fn){
      line.push( d[fn] );
    })
    inorder.push(line)
  })
  
  var linelist = inorder.map(function(line){
    return line.join('\t');
  })
  
  return linelist.join('\n')

}