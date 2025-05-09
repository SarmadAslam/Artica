// import mongoose from 'mongoose';

// const artworkSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   category: String,
//   tags: [String],
//   availableForSale: Boolean,
//   price: Number,
//   size: String,
//   sellAs: String,
//   images: [String], // store file paths
//   exhibitionTitle: String
// });

// export const Artwork = mongoose.model('Artwork', artworkSchema);



//deepseek image 
import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  tags: [String],
  availableForSale: Boolean,
  price: Number,
  size: String,
  sellAs: String,
  images: [String], // This will store just the filenames
  exhibitionTitle: String
});

// Add virtual for full image URLs
artworkSchema.virtual('imageUrls').get(function() {
  return this.images.map(image => `/artwork-uploads/${image}`);
});

// Ensure virtuals are included when converting to JSON
artworkSchema.set('toJSON', { virtuals: true });

export const Artwork = mongoose.model('Artwork', artworkSchema);
  