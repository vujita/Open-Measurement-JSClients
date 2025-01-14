goog.module('omid.validationVerificationScript.ValidationVerificationClient');
const {packageExport} = goog.require('omid.common.exporter');
const {AdEventType} = goog.require('omid.common.constants');
const VerificationClient = goog.require('omid.verificationClient.VerificationClient');
/** @const {string} the default address for the logs.*/
const DefaultLogServer = 'http://iabtechlab.com:66/sendMessage?msg=';

/**
 * OMID ValidationVerificationClient.
 * Simple validation script example.
 * The script creates VerificationClient instance and register to the OMID events.
 * The script fires logs for every event that is received by the OMID.
 */
class ValidationVerificationClient {
    /**
     * Simple ValidationVerificationClient
     *  - log if support is true
     *  - register to sessionObserver
     *  - register a callback to all AdEventType, except additional registration to video events
     * @param {VerificationClient} verificationClient instance for communication with OMID server
     * @param {string} vendorKey - should be the same when calling sessionStart in order to get verificationParameters
     */
    constructor(verificationClient, vendorKey) {
        /** @private {VerificationClient} */
        this.verificationClient_ = verificationClient;
        const isSupported = this.verificationClient_.isSupported();
        this.logMessage_('OmidSupported['+isSupported+']', (new Date()).getTime());
        if (isSupported) {
            const self = this;
            this.verificationClient_.registerSessionObserver((event) => this.sessionObserverCallback_(event), vendorKey);
            Object.keys(AdEventType).filter((el) => el !== 'VIDEO').forEach( function(el) {
                self.verificationClient_.addEventListener(AdEventType[el], (event) => self.omidEventListenerCallback_(event));
            });
        }
    }

    /**
     * Log message to the server
     * Message will have the format: <Date> :: <Message>
     * For example: 10/8/2017, 10:41:11 AM::"OmidSupported[true]"
     * @param {Object|string} message to send to the server
     * @param {number} timestamp of the event
     */
    logMessage_(message, timestamp) {
        const log = (new Date(timestamp)).toLocaleString()+ '::' + JSON.stringify(message);
        this.sendUrl_(log);
    }

    /**
     * Call verificationClient sendUrl for message with the correct logServer
     * @param {string} message to send to the server
     */
    sendUrl_(message) {
        const url = (DefaultLogServer + encodeURIComponent(message));
        this.verificationClient_.sendUrl(url);
    }

    /**
     * Callback for addEventListener.
     * Sending event logs to the server
     * @param {Object} event data
     */
    omidEventListenerCallback_(event) {
        this.logMessage_(event, event.timestamp);
    }

    /**
     * Callback for registerSessionObserver.
     * Sending session logs to the server
     * @param {Object} event data
     */
    sessionObserverCallback_(event) {
        this.logMessage_(event, event.timestamp);
    }
}
exports = ValidationVerificationClient;
