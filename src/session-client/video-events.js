goog.module('omid.sessionClient.VideoEvents');

const AdSession = goog.require('omid.sessionClient.AdSession');
const argsChecker = goog.require('omid.common.argsChecker');
const {InteractionType, VideoPlayerState} = goog.require('omid.common.constants');
const {VastProperties} = goog.require('omid.common.eventTypedefs');
const {packageExport} = goog.require('omid.common.exporter');

/**
 * Provides a complete list of supported JS video events. Using this event API
 * assumes the video player is fully responsible for communicating all video
 * events at the appropriate times. Only one video events implementation can be
 * associated with the ad session and any attempt to create multiple instances
 * will result in an error. The same rules apply to both multiple JS video
 * events and any attempt to register a JS video events instance when a native
 * instance has already been registered via the native bridge.
 */
class VideoEvents {
  /**
   * @param {!AdSession} adSession associated with the video events.
   * @throws error if the supplied ad session is undefined or null.
   */
  constructor(adSession) {
    argsChecker.assertNotNullObject('VideoEvents.adSession', adSession);

    try {
      adSession.registerVideoEvents();
      this.adSession = adSession;
    } catch (error) {
      throw new Error(
          'AdSession already has a video events instance registered');
    }
  }

  /**
   * Notifies all video listeners that video content has been loaded and ready
   * to start playing.
   * @param {!VastProperties} vastProperties containing static information
   *   about the video placement.
   * @throws error if the supplied VAST properties is undefined or null.
   * @see VastProperties
   */
  loaded(vastProperties) {
    argsChecker.assertNotNullObject(
        'VideoEvents.loaded.vastProperties', vastProperties);
    this.adSession.sendOneWayMessage('loaded', vastProperties);
  }


  /**
   * Notifies all video listeners that video content has started playing.
   * @param {number} duration of the selected video media (in seconds).
   * @param {number} videoPlayerVolume from the native video player with a
   *   range between 0 and 1.
   * @throws error if an invalid duration or videoPlayerVolume has been
   *   supplied.
   */
  start(duration, videoPlayerVolume) {
    argsChecker.assertNumber('VideoEvents.start.duration', duration);
    argsChecker.assertNumberBetween('VideoEvents.start.videoPlayerVolume',
        videoPlayerVolume, 0, 1);
    this.adSession.sendOneWayMessage('start', duration, videoPlayerVolume);
  }

  /**
   * Notifies all video listeners that video playback has reached the first
   * quartile.
   */
  firstQuartile() {
    this.adSession.sendOneWayMessage('firstQuartile');
  }

  /**
   * Notifies all video listeners that video playback has reached the midpoint.
   */
  midpoint() {
    this.adSession.sendOneWayMessage('midpoint');
  }

  /**
   * Notifies all video listeners that video playback has reached the third
   * quartile.
   */
  thirdQuartile() {
    this.adSession.sendOneWayMessage('thirdQuartile');
  }

  /**
   * Notifies all video listeners that video playback is complete.
   */
  complete() {
    this.adSession.sendOneWayMessage('complete');
  }

  /**
   * Notifies all video listeners that video playback has paused after a user
   * interaction.
   */
  pause() {
    this.adSession.sendOneWayMessage('pause');
  }

  /**
   * Notifies all video listeners that video playback has resumed (after being
   * paused) after a user interaction.
   */
  resume() {
    this.adSession.sendOneWayMessage('resume');
  }

  /**
   * Notifies all video listeners that video playback has stopped and started
   * buffering.
   */
  bufferStart() {
    this.adSession.sendOneWayMessage('bufferStart');
  }

  /**
   * Notifies all video listeners that buffering has finished and video playback
   * has resumed.
   */
  bufferFinish() {
    this.adSession.sendOneWayMessage('bufferFinish');
  }

  /**
   * Notifies all video listeners that video playback has stopped as a user skip
   * interaction. Once skipped video it should not be possible for the video to
   * resume playing content.
   */
  skipped() {
    this.adSession.sendOneWayMessage('skipped');
  }

  /**
   * Notifies all video listeners that the video player volume has changed.
   * @param {number} videoPlayerVolume from the native video player.
   * @throws error if an invalid videoPlayerVolume has been supplied.
   */
  volumeChange(videoPlayerVolume) {
    argsChecker.assertNumberBetween(
        'VideoEvents.volumeChange.videoPlayerVolume', videoPlayerVolume, 0, 1);
    this.adSession.sendOneWayMessage('volumeChange', videoPlayerVolume);
  }

  /**
   * Notifies all video listeners that video player state has changed.
   * @param {!VideoPlayerState} playerState to signal the latest video player
   *   state
   * @throws error if the supplied player state is undefined or null.
   * @see PlayerState
   */
  playerStateChange(playerState) {
    argsChecker.assertNotNullObject(
        'VideoEvents.playerStateChange.playerState', playerState);
    this.adSession.sendOneWayMessage('playerStateChange', playerState);
  }

  /**
   * Notifies all video listeners that the user has performed an ad interaction.
   * @param {!InteractionType} interactionType to signal the latest user
   *   integration
   * @throws error if the supplied interaction type is undefined or null.
   */
  adUserInteraction(interactionType) {
    argsChecker.assertNotNullObject(
        'VideoEvents.adUserInteraction.interactionType', interactionType);
    this.adSession.sendOneWayMessage('adUserInteraction', interactionType);
  }
}

packageExport('OmidSessionClient.VideoEvents', VideoEvents);
exports = VideoEvents;
