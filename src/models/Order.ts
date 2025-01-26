import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    customizations: {
      model: String,
      color: String,
      material: String,
      protection: String,
      finish: String,
      customText: String,
      imageUrl: String
    },
    quantity: { 
      type: Number, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema); 