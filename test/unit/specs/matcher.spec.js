import { matcher } from '@/index'

describe('matcher', () => {
    it('should return true if right type and subtype', () => {
        const m = matcher('image/gif')

        expect(m('image/gif')).to.be.true
        expect(m('image/jpeg')).to.be.false
    })

    it('should return true for epub special mime type', () => {
        const m = matcher('application/epub+zip')

        expect(m('application/epub+zip')).to.be.true
    })

    it('should return true if right type', () => {
        const m = matcher('image/*')

        expect(m('image/gif')).to.be.true
        expect(m('image/bmp')).to.be.true
        expect(m('text/xml')).to.be.false
    })

    it('should return true for all valid mime types', () => {
        const m = matcher('*/*')

        expect(m('image/gif')).to.be.true
        expect(m('image/bmp')).to.be.true
        expect(m('text/xml')).to.be.true
    })

    it('should return true if any of multiple types', () => {
        const m = matcher('image/*', 'text/*')

        expect(m('image/gif')).to.be.true
        expect(m('image/bmp')).to.be.true
        expect(m('text/xml')).to.be.true
        expect(m('audio/mp3')).to.be.false
    })

    it('should throw error when constructor is invoked with invalid mime type', () => {
        expect(() => matcher('subtype')).to.throw(TypeError)
        expect(() => matcher('type/')).to.throw(TypeError)
        expect(() => matcher('/subtype')).to.throw(TypeError)
        expect(() => matcher('/')).to.throw(TypeError)
        expect(() => matcher('')).to.throw(TypeError)
    })

    it('should return false when invalid mime type string is passed to match', () => {
        const m = matcher('type/subtype')

        expect(m('subtype')).to.be.false
        expect(m('type/')).to.be.false
        expect(m('/subtype')).to.be.false
        expect(m('/')).to.be.false
        expect(m('')).to.be.false
    })

    it('should match mime type ignoring parameter', () => {
        expect(matcher('img/jpeg; charset=utf-8')("img/jpeg")).to.be.true
        expect(matcher('img/gif; charset=utf-8')("img/jpeg")).to.be.false
        expect(matcher('img/jpeg')("img/jpeg; charset=utf-8")).to.be.true
        expect(matcher('img/jpeg')("img/gif; charset=utf-8")).to.be.false
    })
})
