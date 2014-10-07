var Scription = require('../js/scription');

describe("Scription", function() {
  var scription = new Scription();

  it("get bilingual schema", function() {
    var input = 'en\nes\n\nhouse\ncasa';
    var result = scription._getSchema(input);
    expect(result).toEqual(['en', 'es']); 
  })

  it("parses lexicon", function() {
// Ña̠… köxíni̠-yu.
// Well… I don’t know.
// ña̠ kö-xíni̠-yu
// well NEG-to.know;PRES-WTF
    var input = 'mixtec\nenglish\nmorph\ngloss\n\nÑa̠… köxíni̠-yu.\nWell… I don’t know.\nña̠   kö-xíni̠-yu\nwell NEG-to.know.PRES-1S\n';
    var result = scription.parse(input);
    expect(result).toEqual( [
    {
      "mixtec": "Ña̠… köxíni̠-yu.",
      "english": "Well… I don’t know.",
      "morph": "ña̠   kö-xíni̠-yu",
      "gloss": "well NEG-to.know.PRES-1S"
    }]
  )

  });

  it("parses a bilingual word", function() {
    var input = 'en\nes\n\nhouse\ncasa';
    var result = scription.parse(input);
    expect(result).toEqual([{'en': 'house', 'es': 'casa'}]);
  });

  it("parses stanzas", function() {
    var result = scription._parseIntoStanzas('1a\n1b\n\n2a\n2b\n\n3a\n3b');
    expect(result).toEqual([['1a','1b'], ['2a','2b'], ['3a', '3b']]);
  });

  it("parses stanzas with extra blank lines", function() {
    var result = scription._parseIntoStanzas('1a\n1b\n\n\n\n\n2a\n2b\n\n3a\n3b');
    expect(result).toEqual([['1a','1b'], ['2a','2b'], ['3a', '3b']]);
  });

  it("parses stanzas with extra blank lines at end", function() {
    var result = scription._parseIntoStanzas('1a\n1b\n\n2a\n2b\n\n3a\n3b\n\n\n');
    expect(result).toEqual([['1a','1b'], ['2a','2b'], ['3a', '3b']]);
  });

  it("parses stanzas with trailing whitespace", function() {
    var result = scription._parseIntoStanzas('1a\n1b\n\n2a\n2b\n\n3a\n3b  \n\n');
    expect(result).toEqual([['1a','1b'], ['2a','2b'], ['3a', '3b']]);
  });

  it("parses a trilingual word", function() {
    var input = 'en\nes\nmixtec\n\nhouse\ncasa\nve’e';
    var result = scription.parse(input);
    expect(result).toEqual([
     { 'en':'house', 'es':'casa', 'mixtec': 've’e'} 
    ]);
  });

  it("can label a stanza with schema fields", function() {
    result = scription._label(["a", "b"], [1, 2]);
    expect(result).toEqual({"a": 1, "b": 2});
  })

  it("parses a word with two fields", function() {
    var input = 'en\nes\n\nhouse\ncasa';
    var result = scription.parse(input);
    expect(result).toEqual([{'en': 'house', 'es': 'casa'}]);
  });

  it("parses two words with two fields", function() {
    var input = 'en\nes\n\nhouse\ncasa';
        input += '\n\ncat\ngato';
    var result = scription.parse(input);
    expect(result).toEqual([
      {'en': 'house', 'es': 'casa'},
      {'en': 'cat', 'es': 'gato'}
    ]);
  });

  xit("merges all lines after an ellipsed field", function() {
    var input = 'mixtec\ntranslations.en\n...notes\n\nve’e\nhouse\ncan also mean\nacademy';

    var result = scription.parse(input);

    expect(result).toEqual([{
      'mixtec': 've’e', 
      'translations': {
        'en' : 'house'
      },
      'notes' : 'can also mean\nacademy'
    }]);
  });

  it("parses a word with two dotted key fields", function() {
    var input = 'mixtec\ntranslations.es\ntranslations.en\n\n' 
              + 'káchi\ndecir\nsay\n\n'
              + 've’e\ncasa\nhouse';

    var result = scription.parse(input);

    expect(result).toEqual([
      {
        'mixtec': 'káchi', 
        'translations': {
          'en' : 'say',
          'es' : 'decir'
        }
      },
      {
        'mixtec': 've’e', 
        'translations': {
          'en' : 'house',
          'es' : 'casa'
        }
      }
     ]);
  });
});
