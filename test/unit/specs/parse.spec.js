import { parse } from '@/index'
import validMimeTypes from "./valid-mime-types.txt"

describe('parse', () => {

  it('should parse mime type correctly', () => {
    expect(parse('type*/subtype')).to.deep.equal({
      valid: false
    })

    expect(parse('type/subtype')).to.deep.equal({
      valid:true,
      type: 'type',
      subType: 'subtype',
      parameter: undefined
    })
    
    expect(parse('type/*')).to.deep.equal({
      valid:true,
      type: 'type',
      subType: '*',
      parameter: undefined
    })

    expect(parse('type/subtype; charset=utf-8')).to.deep.equal({
      valid:true,
      type: 'type',
      subType: 'subtype',
      parameter: 'charset=utf-8'
    })
  })
  
})
