class Scription {
  constructor() {}

  _parseField(field) {
    return field
  }

  _getSchema(input) {
    let first = this.parse(input)[0]
    let fields = Object.keys(first)
    fields.sort()
    return fields
  }

  _label(fields, values) {
    let labeled = {}

    let isDotted = field => field.includes('.')

    // handle dotted fields
    fields.forEach(function (field, i) {
      let value = values[i]

      if (isDotted(field)) {
        let outer = field.split(".")[0], inner = field.split(".")[1]
        if (!(outer in labeled)) {
          labeled[outer] = {}
          labeled[outer][inner] = value
        } else {
          labeled[outer][inner] = value
        }
      } else {
        labeled[field] = value
      }
    })
    return labeled
  }
  
  _parseIntoStanzas(input) {
    let stanzas = []
    return input
      .trim()
      .split(/\n[\n]+/)
      .map(function (stanza) {
        return stanza.split(/\n/)
      })
  }

  parse(input, schema) {
    let data = {}
    input = input.trim()

    let stanzas = this._parseIntoStanzas(input)

    schema = schema.trim().split(/\n/).map((s) => s.trim())

    data = stanzas.map((stanza) => this._label(schema, stanza))

    return data
  }
}

export { Scription }
