import { isValid as isValidMime } from '@/index'
import validMimeTypes from "./valid-mime-types.txt"

describe('isValid', () => {

  it('should return false on invalid mime type string', () => {
    expect(isValidMime('type*/subtype')).to.be.false
    expect(isValidMime('*type/subtype')).to.be.false
    expect(isValidMime('subtype')).to.be.false
    expect(isValidMime('type/')).to.be.false
    expect(isValidMime('/subtype')).to.be.false
    expect(isValidMime('/')).to.be.false
    expect(isValidMime('')).to.be.false  
  })
  
  it('should true on valid mime type string', () => {
    expect(isValidMime('*/*')).to.be.true
    expect(isValidMime('*/subtype')).to.be.true
    expect(isValidMime('type/subtype')).to.be.true
  })

  it('should true on mime type with parameter', () => {
    expect(isValidMime('type/subtype; charset=utf-8')).to.be.true
    expect(isValidMime('type; charset=utf-8')).to.be.false
  })

  it('should true on list of valid mime types', () => {

    validMimeTypes
    .split("\n")
    .forEach((mimeTypeString) => {
      expect(isValidMime(mimeTypeString)).to.be.true
    })
  })
})
