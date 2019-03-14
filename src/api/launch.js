import Api from './index'

export default {
  async getNext (limit, query) {
    const req = await Api().get('/launch/next/' + limit, {
      params: this.computeQuery(query),
    })
    return req.status === 200 ? req.data : []
  },
  async getPast (limit, query) {
    const req = await Api().get('/launch/past/' + limit, {
      params: this.computeQuery(query),
    })
    return req.status === 200 ? req.data : []
  },
  async getLaunch (payload) {
    const req = await Api().get('/launch/' + payload.id)
    return req.status === 200 ? req.data : {}
  },

  computeQuery (query) {
    return {
      ...(query.offset && { offset: query.offset }),
      ...(query.filterKey && { filterKey: query.filterKey }),
      ...(query.filterValue && { filterValue: query.filterValue }),
      ...(query.search && { search: query.search }),
    }
  },
}
