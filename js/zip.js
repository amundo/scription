function zip(A,B){
  var d = {};
  A.forEach(function(a, i){
    d[a] = B[i]
  })
  return d;
}

var A = 'abc'.split(''),
    B = 'ABC'.split('');

console.log(zip(A,B))

var chunks = document.querySelector('#scription').value.split(/\n\n+/);

console.log(zip(chunks[0].split('\n'), chunks[1].split('\n')))

