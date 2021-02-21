import ifetch from 'isomorphic-fetch'
export const fetchMultipleUrls = async (urls) => {
  let data
  try {
    data = await Promise.all(
      urls.map(async (url) => {
        const response = await ifetch(url)
        return response.json()
      })
    )
  } catch (error) {}
  return data
}
