import { get } from 'idb-keyval'
import TagManager from 'react-gtm-module'
import sparkles from 'sparkles'
const emitter = sparkles()

const currentEnvironment = process.env.ENV || process.env.NODE_ENV || 'development'

const defaultOptions = {
  environments: ['production'],
  debug: false,
}

const IsGtmTracking = () => {
  return Boolean(window.google_tag_manager)
}

const initializeGtm = async (googleTagManager) => {
  if (!IsGtmTracking() && googleTagManager.keyName) {
    const userHasAccepted = await get(googleTagManager.keyName)
    if (userHasAccepted) {
      TagManager.initialize({
        gtmId: googleTagManager.trackingId,
        auth: googleTagManager.auth,
      })
    }
  }
}

const updateGtmDataLayer = async (googleTagManager, location) => {
  if (IsGtmTracking() && googleTagManager.keyName) {
    const userHasAccepted = await get(googleTagManager.keyName)
    if (userHasAccepted) {
      TagManager.dataLayer({
        dataLayer: {
          event: googleTagManager.routeChangeEventName,
          value: location.pathname,
        },
      })
    }
  }
}

export const onClientEntry = (_, { environments = defaultOptions.environments, debug, googleTagManager }) => {
  if (debug) {
    console.log('onClientEntry - currentEnvironment:', currentEnvironment)
  }

  // check for the production environment
  if (!environments.includes(currentEnvironment)) {
    if (debug) {
      console.log('onClientEntry - abort tracking since the environment is to configured. environments: ', environments)
    }
    return null
  }

  initializeGtm(googleTagManager)

  if (googleTagManager.triggerEventName) {
    emitter.on(googleTagManager.triggerEventName, () => initializeGtm(googleTagManager))
  }
}

export const onRouteUpdate = ({ location }, { environments = defaultOptions.environments, debug, googleTagManager }) => {
  if (!environments.includes(currentEnvironment)) {
    if (debug) {
      console.log('onClientEntry - abort tracking since the environment is to configured. environments: ', environments)
    }
    return null
  }

  if (debug) {
    console.log('onRouteUpdate - start tracking functions definitions')
  }

  if (googleTagManager.routeChangeEventName) {
    updateGtmDataLayer(googleTagManager, location)
  }
}
