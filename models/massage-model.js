import { Schema, model } from 'mongoose'

const MassageSchema = new Schema({
  name: { type: String },
  image: { type: Array },
})
// mongo ругается, если документ без _id

export default model('Massage', MassageSchema);
