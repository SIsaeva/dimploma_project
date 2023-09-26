const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: {createdAt: 'created_at'}
})
module.exports = model('Post', schema)