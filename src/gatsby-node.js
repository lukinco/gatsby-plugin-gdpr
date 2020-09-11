exports.onPreInit = ({ reporter }, options) => {
  if (!options.googleTagManager && !options.googleTagManager.trackingId) {
    reporter.warn(
      'The Google Tag Manager plugin requires at least a tracking ID of Google Tag Manager.'
    )
  }
}
