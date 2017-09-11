import axios from 'axios'

// TODO: add API Keys and shift to feathers service

// api Interfaces : {
//  "term"
//  "id"
//  page: number
//  fullData: Bool
// }
// limit currently hardcoded to 10.
// return: Promise({
//   results: [result]
//   data: {raw data}
//   total: number
//   page: number
//   more: Bool (there are more pages to request)
//   getDetails: function: repeat details
// })

export function recipeSearch ({term, id = null, page = 1}) {
  // current recipe API does not implement digest mode, fullData ignored
  var type = 'q'
  if (id != null) {
    type = 'r'
    term = id
  }
  let from = page * 10 - 10
  let urlBase = "https://api.edamam.com/search?"
  let url = `${urlBase}${type}=${term}&from=${from}`
  let results = (async function(){
    let data = await axios.get(url)
    data = data.data
    return {
      data,
      page,
      results: data.hits,
      total: data.count,
      more: data.more
    }
  })()
  return results
}

export async function recipeDetails (recipe) {
  let details = await recipeSearch({id: recipe.uri})
  debugger
  return details
}

export function recallSearch ({term, fullData = false, page = 1}) {
  let limit = fullData? 10 : 1
  let skip = page * 10 - 10
  // TODO: Improve unicode handling before passing to FDA
  term = term.replace(/\s+/g, '+').replace(/\W+|\+/g, '')
  let url = `https://api.fda.gov/food/enforcement.json?search=product_description:"${term}"+AND+status:"Ongoing"&limit=${limit}&skip=${skip}`
  // There is an error in the FDA documentation. The status flag for Ongoing
  // recalls is listed as "On-Going" but the value is actually "Ongoing"
  let results = (async function() {
    var data
    try {
      data = await axios.get(url)
      data = data.data
      return {
        data,
        page,
        results: data.results,
        total: data.meta.results.total,
        more: (page * 10) < data.meta.results.total,
        getDetails (page = 1) {
          return recallSearch({term, page, fullData: true})
        }
      }
    } catch (e) {
      if (e.response.status === 404) {
        // FDA api returns 404 on no results, rather than successful zero
        // results
        return {
          data,
          page,
          results: [],
          total: 0,
          more: false
        }
      } else {
        throw new Error('Error connecting to recall API')
      }
    }
    return data
  })()
  return results
}
