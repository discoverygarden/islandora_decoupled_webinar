import ky from 'ky'
import Jsona from 'jsona'

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

export default drupalClient
