import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  color: { 
    type: String, 
    required: true 
  },
  material: { 
    type: String, 
    required: true 
  },
  protection: { 
    type: String, 
    required: true 
  },
  finish: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  customText: String,
  imageUrl: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema); 