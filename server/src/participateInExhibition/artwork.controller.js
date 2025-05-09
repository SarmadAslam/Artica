


// import { Artwork } from './artwork.model.js';

// // ✅ POST /participate
// export const createArtwork = async (req, res) => {
//   try {
//     console.log("Request files:", req.files);
//     console.log("Request body:", req.body);

//     const {
//       title,
//       description,
//       category,
//       tags,
//       availableForSale,
//       price,
//       size,
//       sellAs,
//       exhibitionTitle
//     } = req.body;

//     if (!req.files || req.files.length === 0) {
//       console.error("No files were uploaded");
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const imagePaths = req.files.map((file) => file.path);

//     const newArtwork = new Artwork({
//       title,
//       description,
//       category,
//       tags: JSON.parse(tags),
//       availableForSale: availableForSale === 'true',
//       price,
//       size,
//       sellAs,
//       images: imagePaths,
//       exhibitionTitle
//     });

//     await newArtwork.save();
//     res.status(201).json({ message: 'Artwork submitted successfully' });
//   } catch (error) {
//     console.error('Submission failed:', error);
//     res.status(500).json({ error: 'Failed to submit artwork' });
//   }
// };

// // ✅ GET /all
// // export const getAllArtworks = async (req, res) => {
// //   try {
// //     const artworks = await Artwork.find();
// //     res.status(200).json(artworks);
// //   } catch (error) {
// //     console.error('Error fetching artworks:', error);
// //     res.status(500).json({ error: 'Failed to fetch artworks' });
// //   }
// // };
// // In your backend controller
// export const getAllArtworks = async (req, res) => {
//     try {
//       const artworks = await Artwork.find();
      
//       // Map through artworks and modify image paths
//       const artworksWithFullUrls = artworks.map(artwork => ({
//         ...artwork._doc,
//         images: artwork.images.map(image => 
//           `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, '/')}`
//         )
//       }));
      
//       res.status(200).json(artworksWithFullUrls);
//     } catch (error) {
//       console.error('Error fetching artworks:', error);
//       res.status(500).json({ error: 'Failed to fetch artworks' });
//     }
//   };



//deepseek for image display



import { Artwork } from './artwork.model.js';  // Add this import at the top

export const createArtwork = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        // Store only filenames in database
        const imagePaths = req.files.map(file => file.filename);

        const newArtwork = new Artwork({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            tags: JSON.parse(req.body.tags),
            availableForSale: req.body.availableForSale === 'true',
            price: req.body.price,
            size: req.body.size,
            sellAs: req.body.sellAs,
            images: imagePaths, // Store only filenames
            exhibitionTitle: req.body.exhibitionTitle
        });

        await newArtwork.save();
        res.status(201).json(newArtwork);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to submit artwork' });
    }
};

export const getAllArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.status(200).json(artworks);
    } catch (error) {
        console.error('Error fetching artworks:', error);
        res.status(500).json({ error: 'Failed to fetch artworks' });
    }
};