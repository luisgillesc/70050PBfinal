import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const ticketSchema = new mongoose.Schema({
  code: { type: String, default: uuidv4(), unique: true },  // Código único
  purchase_datetime: { type: Date, default: Date.now },  // Fecha de la compra
  amount: { type: Number, required: true },  // Total de la compra
  purchaser: { type: String, required: true }  // Correo del comprador
});

module.exports = mongoose.model('Ticket', ticketSchema);
