declare module "mime-matcher"

export function parse(a: string): ParsingResult
export function isValid(a: string): boolean

interface ParsingResult {
    isValid: boolean,
    type: string,
    subType: string,
    parameter: string
}

export default class MimeMatcher {
    constructor(...expected: string[])
    match(actual: string): boolean
}
