import drupalClient from '../../utils/api'

const ApiTest = () => {
  testRequest()
  return ''
}

const testRequest = async () => {
    const json = await drupalClient('node/islandora_object')
    console.log(json)
}

export default ApiTest