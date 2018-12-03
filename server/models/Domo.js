const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertID = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const DomoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  body: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  date: {
    type: String,
    default: `${new Date().toISOString().substring(5, 7)}/${new Date().toISOString().substring(8, 10)}/${new Date().toISOString().substring(0, 4)}`,
  },
  duedate: {
    type: String,
    default:  `${new Date().toISOString().substring(5, 7)}/${new Date().toISOString().substring(8, 10)}/${new Date().toISOString().substring(0, 4)}`,
  },
  colour: {
    type: String,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  body: doc.body,
  _id: doc._id,
  colour: doc.colour,
  date: doc.date,
  duedate: doc.duedate,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };

  return DomoModel.find(search).select('title body colour date duedate').exec(callback);
};

DomoSchema.statics.removeByID = (docID, callback) => {
  const search = {
    _id: docID,
  };

  return DomoModel.find(search).remove().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
