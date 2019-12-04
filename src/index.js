const MIME_TYPE_REGEX = /^(\*|[a-z0-9._\-]+)\/(\*|[a-z0-9._\-]+)(?:; ([a-zA-Z0-9._\-=]+))?$/

function createMatcher(expected) {
    if (expected === '*') {
        return () => true
    } else {
        return (actual) => actual === expected
    }
}

function parse(mimeType) {
    if (!mimeType) {
        return {
            valid: false
        }
    }

    const match = mimeType.match(MIME_TYPE_REGEX)
    const valid = Boolean(match)

    if (!valid) {
        return {
            valid: false
        }
    }

    const [, type, subType, parameter] = Array.from(match)
    return {
        valid,
        type,
        subType,
        parameter
    }
}

function isValid(mimeType) {
    return parse(mimeType).valid
}

function matcher(...expected) {
    const m = new MimeMatcher(...expected)
    return actual => m.match(actual)
}

class MimeMatcher {
    expected = []

    constructor(...expected) {
        this.expected = expected.map(mimeType => {
            const {valid, type, subType} = parse(mimeType)
            if (valid) {
                return ({
                    typeMatcher: createMatcher(type),
                    subTypeMatcher: createMatcher(subType)
                })
            } else {
                const msg = `Value "${mimeType}" is not valid mime type.It should have format "type/subtype".`
                throw new TypeError(msg)
            }
        })

    }

    match(actual) {
        const {valid, type, subType} = parse(actual)
        if (valid) {
            return this.expected.some(({typeMatcher, subTypeMatcher}) => {
                return typeMatcher(type) && subTypeMatcher(subType)
            })
        } else {
            return false
        }
    }
}

export {isValid, parse, matcher}

export default MimeMatcher
