const express = require('express')
const axios = require('axios')

const resasApi = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.APIKEY,
  },
  responseType: 'json',
})
const app = express()

// 都道府県一覧を返す
// https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
app.get('/prefectures', (req, res) => {
  resasApi
    .get('/prefectures')
    .then(function (response) {
      res.json(response.data.result)
    })
    .catch(function () {
      res.status(500)
      res.send({ error: '500' })
    })
})

// prefCodeの総人口を返す
// https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
app.get('/population/:prefCode', (req, res) => {
  resasApi
    .get('/population/composition/perYear', {
      params: { prefCode: req.params.prefCode, cityCode: '-' },
    })
    .then(function (response) {
      const result = response.data.result.data.find(
        (item) => item.label === '総人口'
      )

      res.json(result.data)
    })
    .catch(function () {
      res.status(500)
      res.send({ error: '500' })
    })
})

module.exports = {
  path: '/api',
  handler: app,
}
