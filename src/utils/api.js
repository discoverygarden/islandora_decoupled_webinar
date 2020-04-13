import ky from 'ky'
import Jsona from 'jsona'

/**
 * Helper function to execute JSONAPI query's for a given
 * endpoint.
 *
 * @param endpoint
 * @returns {Promise<any>}
 */
const drupalClient = (endpoint) => {
    const client = ky.extend({
        prefixUrl: `${process.env.REACT_APP_DRUPAL_JSON_API_URL}`,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        }
    })
    return new Promise(async function(resolve, reject) {
        const data = await client.get(endpoint).json()
        const dataFormatter = new Jsona()
        resolve(dataFormatter.deserialize(data))
    })
}

/**
 * Creates an array of JSON objects describing islandora objects
 * given the a jsonapi query response.
 *
 * @param json
 * @returns {Array}
 */
const cleanObjectData = (json) => {
    const objects_data = []
    json.forEach(islandora_object => {
        objects_data[islandora_object.id] = {
            'name': islandora_object.title,
            'uuid': islandora_object.id,
            'path': `${process.env.REACT_APP_DRUPAL_URL}/node/${islandora_object.drupal_internal__nid}`
        }
    })

    return objects_data
}

/**
 * Retrieve all islandora object data.
 *
 * @returns {Promise<any>}
 */
const getIslandoraObjectJson = async () => {
    const json = await drupalClient('node/islandora_object')
    return json
}

/**
 * Retrieve media for all objects in our JSON response, and
 * prepare data to be used by a components state.
 *
 * @param objects_data
 * @param json
 * @returns {Promise<Array>}
 *   State data
 */
const getIslandoraMediaAndStateData = async (objects_data, json) => {
    const filters = {
        'field_media_of.id': 'filter[media][condition][path]',
        IN: 'filter[media][condition][operator]',
        'Thumbnail Image': 'filter[thumb-filter][condition][value]',
        'field_media_use.name': 'filter[thumb-filter][condition][path]'
    }
    const entities = json ? json : []
    if (entities.length) {
        entities.forEach(element => {
            filters[element.id] = 'filter[media][condition][value][]'
        })
    } else {
        filters[entities.id] = 'filter[media][condition][value][]'
    }

    const mediaQueryStr = Object.keys(filters)
        .map(k => `${filters[k]}=${k}`)
        .join('&')

    const media = await drupalClient(`media/?include=thumbnail,field_media_use&${mediaQueryStr}`)

    const stateData = []
    media.forEach(object_media => {
        objects_data[object_media.field_media_of.id]['img_src']
            = `${process.env.REACT_APP_DRUPAL_URL}${object_media.thumbnail.uri.url}`

        stateData.push(objects_data[object_media.field_media_of.id])
    })

    return stateData
}

/**
 * Retrieve all required data for this app.
 *
 * @returns {Promise<Array>}
 *   {
 *      img_src: URL image source to an objects thumbnail
​​ *      name: Title of the object
​​ *      path: Route to the object on the given server
​​ *      uuid: The UUID of the object
 *   }
 */
const reactAppData = async () => {
    const json = await getIslandoraObjectJson()
    const objects_data = cleanObjectData(json)

    return await getIslandoraMediaAndStateData(objects_data, json);
}

export default reactAppData
