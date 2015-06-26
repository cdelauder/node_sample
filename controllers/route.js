module.exports = function(app) {
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/node_sample';

  MongoClient.connect(url, function(err, db) {
    var names = db.collection('names');
    console.log("Connected correctly to server");
    app.get('/', function(req, res) {
      var namesArray;
      names.find({}).toArray(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
          namesArray = doc;
        }
        res.render('index', {
          names: namesArray    
        });
      })
    });
    app.get('/add', function (req, res) {
      res.render('add');
    });
    app.post('/add', function (req, res) {
      names.insert({
        name: req.body.name
      }, function (err, doc) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          console.log(doc);
          res.redirect('/');
        }
      })
    })
    app.get('/:id', function(req, res) {
      var ObjectID = require('mongodb').ObjectID;
      names.findOne({
        _id: ObjectID.createFromHexString(req.params.id)
      }, function(err, doc) {
        if (err) {
          console.log(err);
        }
        console.log(doc)
        res.render('edit', {
          name: doc
        });
      });
    })
    app.post('/:id', function(req, res) {
      var ObjectID = require('mongodb').ObjectID;
      names.update({
        _id: ObjectID.createFromHexString(req.params.id)
      }, {
        $set: {
          name: req.body.name
        }
      },
      function(err, doc) {
        if (err) {
          console.log(err);
        }
        console.log(doc)
        res.redirect('/' + req.params.id);
      });
    })
    app.get('/delete/:id', function (req, res) {
      console.log(typeof(req.params.id))
      var ObjectID = require('mongodb').ObjectID;
      names.remove({
        _id: ObjectID.createFromHexString(req.params.id)
      }, function(err, doc) {
        if (err) {
          console.log(err)
        }
        console.log('doc',doc)
        res.redirect('/');
      });
    });
  });
};