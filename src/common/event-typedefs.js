goog.module('omid.common.eventTypedefs');

const constants = goog.require('omid.common.constants');

/**
 * Represents an ad event that verification partners can subscribe to. This is
 * the definition of what the partner will get back from OMID JS, when the
 * corresponding event has been triggered.
 * @typedef {{
 *   adSessionId: string,
 *   timestamp: number,
 *   type: !constants.AdEventType,
 *   data: ?,
 * }}
 */
let Event;

/**
 * Represents the mobile app native layer is running on and contains key
 * information about it.
 * @typedef {{
 *   libraryVersion: string,
 *   appId: string,
 *   adId: (string|undefined),
 * }}
 */
let App;

/**
 * Contains version information about the OMID JS.
 * @typedef {{
 *   omidImplementer: string,
 *   serviceVersion: string,
 *   sessionClientVersion: (string|undefined),
 *   partnerName: (string|undefined),
 *   partnerVersion: (string|undefined),
 * }}
 */
let OmidJsInfo;

/**
 * Identifies an integration partner by name and version of the code.
 * @typedef {{
 *   partnerName: string,
 *   partnerVersion: string,
 * }}
 */
let OmidNativeInfo;

/**
 * Identifies the device the native layer of the OM SDK is running on.
 * @typedef {{
  *   deviceType: string,
  *   os: string,
  *   osVersion: string,
  * }}
  */
 let DeviceInfo;

// All of the keys of the following object are undefined initially, except for
// omidJsInfo which will contain the version number of the service.
/**
 * @typedef {{
 *   apiVersion: (string|undefined),
 *   environment: (!constants.Environment|undefined),
 *   accessMode: (!constants.AccessMode|undefined),
 *   adSessionType: (!constants.AdSessionType|undefined),
 *   supports: (!Array<constants.SupportedFeatures>|undefined),
 *   omidNativeInfo: (!OmidNativeInfo|undefined),
 *   omidJsInfo: !OmidJsInfo,
 *   app: (!App|undefined),
 *   deviceInfo: (!DeviceInfo|undefined),
 *   customReferenceData: (?Object|undefined),
 * }}
 */
let Context;

/**
 * The ad session configuration is a JSON object containing all key data about
 * native ad session. The ad session configuration structure has been detailed
 * below;
 * @typedef {{
 *   impressionOwner: !constants.EventOwner,
 *   videoEventsOwner: !constants.EventOwner,
 * }}
 */
let AdSessionConfiguration;

/**
 * @typedef {{
 *   viewport: !Viewport,
 *   adView: !AdViewEventData,
 * }}
 */
let GeometryChangeEventData;

/**
 * Represents geometry data of an ad view after processing all parent views to
 * check whether the ad view has been clipped.
 * @typedef {{
 *   x: number,
 *   y: number,
 *   width: number,
 *   height : number,
 * }}
 */
let Geometry;

/**
 * @typedef {{
 *   eventViewport: !Viewport,
 *   eventAdView: !AdViewEventData,
 *   mediaType: !constants.MediaType,
 *   videoEventAdaptorType: (string|undefined),
 *   videoEventAdaptorVersion: (string|undefined),
 * }}
 */
let ImpressionEventData;

/**
 * Represents geometry data of an on screen ad view after processing all parent
 * views to check whether the ad view has been clipped or obstructed.
 * @typedef {{
 *   x: number,
 *   y: number,
 *   width: number,
 *   height: number,
 *   obstructions: !Array,
 * }}
 */
let OnScreenGeometry;

/**
 * @typedef {{
 *   context: !Context,
 *   verificationParameters: (string|undefined),
 * }}
 */
let SessionStartEventData;

/**
 * Captures key VAST properties so they can be shared with all registered
 * verification providers.
 * @typedef {{
 *   isSkippable: boolean,
 *   skipOffset: number,
 *   isAutoPlay: boolean,
 *   position: !constants.VideoPosition,
 * }}
 */
let VastProperties;

/**
 * Represents the device viewport.
 * @typedef {{
 *   width: number,
 *   height: number,
 * }}
 */
let Viewport;

/**
 * @typedef {{
 *   x: number,
 *   y: number,
 *   width: number,
 *   height: number,
 *   adSessionId: (string|undefined),
 *   isFriendlyObstructionFor: (string|undefined),
 *   clipToBounds: (boolean|undefined),
 *   childViews: (Array<!NativeViewInfo>|undefined),
 * }}
 */
let NativeViewInfo;

/**
 * @typedef {{
 *   skippable: boolean,
 *   skipOffset: (number|undefined),
 *   autoPlay: boolean,
 *   position: !constants.VideoPosition,
 * }}
 */
let LoadedVideoEventData;

/**
 * @typedef {{
 *   duration: number,
 *   videoPlayerVolume: number,
 *   deviceVolume: number,
 * }}
 */
let StartVideoEventData;

/**
 * @typedef {{
 *   videoPlayerVolume: number,
 *   deviceVolume: number,
 * }}
 */
let VolumeChangedEventData;

/**
 * @typedef {{
 *   state: !constants.VideoPlayerState,
 * }}
 */
let PlayerStateChangedEventData;

/**
 * @typedef {{
 *   interactionType: !constants.InteractionType,
 * }}
 */
let AdUserInteraction;

/**
 * @typedef {{
 *   message: string,
 * }}
 */
let Error;

/**
 * @typedef {
 *   !LoadedVideoEventData|
 *   !StartVideoEventData|
 *   !VolumeChangedEventData|
 *   !PlayerStateChangedEventData|
 *   !AdUserInteraction|
 *   !Error
 * }
 */
let VideoEventData;

/**
 * @typedef {function(!GeometricEvent)}
 */
let GeometryChangeCallback;

/**
 * @typedef {function(!ImpressionEvent)}
 */
let ImpressionCallback;

/**
 * Handles when a session lifecycle event has been triggered.
 * @typedef {function(!SessionStartEvent)}
 */
let SessionObserverCallback;

/**
 * @typedef {function(!VideoEvent)}
 */
let VideoCallback;

/**
 * @typedef {Event<!AdViewEventData>}
 */
let AdViewEvent;

/**
 * @typedef {Event<!SessionStartEventData>}
 */
let SessionStartEvent;

/**
 * @typedef {Event<!GeometryChangeEventData>}
 */
let GeometricEvent;

/**
 * @typedef {Event<!ImpressionEventData>}
 */
let ImpressionEvent;

/**
 * @typedef {Event<!VideoEventData>}
 */
let VideoEvent;

/**
 * @typedef {
 *   !AdViewEventData|
 *   !SessionStartEventData|
 *   !GeometryChangeEventData|
 *   !ImpressionEventData|
 *   !VideoEventData|
 *   undefined
 * }
 */
let EventData;

/**
 * Provides information about the ad container geometry.
  * @typedef {{
  *   geometry: !Geometry,
  *   onScreenGeometry: !OnScreenGeometry,
  *   reasons: !Array<!constants.Reason>,
  * }}
 */
let AdViewEventData;

/**
 * Represents a single verification vendor script.
 * @typedef {{
  *   resourceUrl: string,
  *   vendorKey: (string|undefined),
  *   verificationParameters: (string|undefined),
  *   accessMode: (string|undefined),
  * }}
  */
 let VerificationScriptResource;

exports = {
  AdSessionConfiguration,
  AdViewEventData,
  App,
  OmidJsInfo,
  OmidNativeInfo,
  DeviceInfo,
  Context,
  Event,
  GeometryChangeEventData,
  Geometry,
  ImpressionEventData,
  OnScreenGeometry,
  SessionStartEventData,
  VastProperties,
  Viewport,
  NativeViewInfo,
  LoadedVideoEventData,
  StartVideoEventData,
  VolumeChangedEventData,
  PlayerStateChangedEventData,
  AdUserInteraction,
  Error,
  VideoEventData,
  GeometryChangeCallback,
  ImpressionCallback,
  SessionObserverCallback,
  VideoCallback,
  AdViewEvent,
  SessionStartEvent,
  GeometricEvent,
  ImpressionEvent,
  VideoEvent,
  EventData,
  VerificationScriptResource,
};
