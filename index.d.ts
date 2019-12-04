declare module "mime-matcher"

export function matcher(...expected: string[]): (actual: string) => boolean
export function parse(mimeType: string): ParsingResult
export function isValid(mimeType: string): boolean

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
