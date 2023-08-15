import MimeMatcher from '@/index'

describe('MimeMatcher', () => {
  it('should return true if right type and subtype', () => {
    const matcher = new MimeMatcher('image/gif')
    
    expect(matcher.match('image/gif')).to.be.true
    expect(matcher.match('image/jpeg')).to.be.false
  })

  it('should return true for epub mime type', () => {
    const matcher = new MimeMatcher('application/epub+zip')
    
    expect(matcher.match('application/epub+zip')).to.be.true
  })

  it('should return true if right type', () => {
    const matcher = new MimeMatcher('image/*')

    expect(matcher.match('image/gif')).to.be.true
    expect(matcher.match('image/bmp')).to.be.true
    expect(matcher.match('text/xml')).to.be.false
  })

  it('should return true for all valid mime types', () => {
    const matcher = new MimeMatcher('*/*')

    expect(matcher.match('image/gif')).to.be.true
    expect(matcher.match('image/bmp')).to.be.true
    expect(matcher.match('text/xml')).to.be.true
  })

  it('should return true if any of multiple types', () => {
    const matcher = new MimeMatcher('image/*', 'text/*')

    expect(matcher.match('image/gif')).to.be.true
    expect(matcher.match('image/bmp')).to.be.true
    expect(matcher.match('text/xml')).to.be.true
    expect(matcher.match('audio/mp3')).to.be.false
  })

  it('should throw error when constructor is invoked with invalid mime type', () => {
    expect(() => new MimeMatcher('subtype')).to.throw(TypeError)
    expect(() => new MimeMatcher('type/')).to.throw(TypeError)
    expect(() => new MimeMatcher('/subtype')).to.throw(TypeError)
    expect(() => new MimeMatcher('/')).to.throw(TypeError)
    expect(() => new MimeMatcher('')).to.throw(TypeError)
  })

  it('should return false when invalid mime type string is passed to match', () => {
    const matcher = new MimeMatcher('type/subtype')

    expect(matcher.match('subtype')).to.be.false
    expect(matcher.match('type/')).to.be.false
    expect(matcher.match('/subtype')).to.be.false
    expect(matcher.match('/')).to.be.false
    expect(matcher.match('')).to.be.false
  })

  it('should match mime type ignoring parameter', () => {
    expect(new MimeMatcher('img/jpeg; charset=utf-8').match("img/jpeg")).to.be.true
    expect(new MimeMatcher('img/gif; charset=utf-8').match("img/jpeg")).to.be.false
    expect(new MimeMatcher('img/jpeg').match("img/jpeg; charset=utf-8")).to.be.true
    expect(new MimeMatcher('img/jpeg').match("img/gif; charset=utf-8")).to.be.false
  })
})
