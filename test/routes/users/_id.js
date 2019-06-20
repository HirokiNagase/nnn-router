exports.get = (req, res) => {
  res.send('req.params.id is ' + req.params.id)
  console.log('user id is ' + req.params.id)
}

exports.put = (req, res) => {
  console.log('hoge')
}
