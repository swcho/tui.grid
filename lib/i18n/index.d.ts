import { OptI18nData } from './../types.d';
interface MapType<T> {
    [propName: string]: T;
}
declare const _default: {
    /**
     * Set messages
     * @param {string} localeCode - Code to set locale messages and
     *     this is the language or language-region combination. (ex: en-US)
     * @param {object} [data] - Messages using in Grid
     */
    setLanguage(localeCode: string, data?: OptI18nData | undefined): void;
    /**
     * Get message
     * @param {string} key - Key to find message (ex: 'net.confirmCreate')
     * @param {object} [replacements] - Values to replace string
     * @returns {string} Message
     */
    get(key: string, replacements?: MapType<string>): string;
};
export default _default;
