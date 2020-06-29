import Api from './index'

export default {
  async subscribe(id, subscription) {
    const req = await Api().post(`/notification/subscribe/${id}`, subscription)
    return req.status === 200 ? req.data : undefined
  },
  async unsubscribe(id, subscription) {
    const req = await Api().get(`/notification/unsubscribe/${id}`, subscription)
    return req.status === 200 ? req.data : undefined
  },
  async subscribeTopic(id, topic, subscription) {
    const req = await Api().post(`/notification/subscribe/${topic}/${id}`, subscription)
    return req.status === 200 ? req.data : undefined
  },
  async unsubscribeTopic(id, topic, subscription) {
    const req = await Api().post(`/notification/unsubscribe/${topic}/${id}`, subscription)
    return req.status === 200 ? req.data : undefined
  },
}
