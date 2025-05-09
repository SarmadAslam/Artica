// import React from "react";
// import Image1 from '@/assets/image1.jpeg';
// import Image2 from '@/assets/image2.jpeg';
// import Image3 from '@/assets/image3.jpeg';
// import Image4 from '@/assets/image4.jpeg';
// const articles = [
//   {
//     id: 1,
//     title: "Guide to Art Collection: Where to Begin",
//     category: "Collecting",
//     description: "Essential tips for new art collectors looking to start their journey.",
//     author: "Emma Wilson",
//     date: "Apr 15, 2025",
//     image: Image1,
//   },
//   {
//     id: 2,
//     title: "Working with Artists: Best Practices",
//     category: "Collaboration",
//     description: "How to build successful relationships with artists for your projects.",
//     author: "James Chan",
//     date: "Apr 17, 2025",
//     image: Image2,
//   },
//   {
//     id: 3,
//     title: "The Rise of Digital Art Marketplaces",
//     category: "Digital Art",
//     description: "Understanding the digital art market and investment opportunities.",
//     author: "Sofia Martinez",
//     date: "Apr 19, 2025",
//     image: Image3,
//   },
// ];

// const LatestArticles: React.FC = () => {
//   return (
//     <section className="py-12 px-6 bg-gray-50">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
//         <a href="#" className="text-[#421983] text-sm font-semibold hover:underline">
//           View All
//         </a>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {articles.map((article) => (
//           <div key={article.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
//             <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
//             <div className="p-6">
//               <span className="text-xs font-semibold text-[#F35E21] uppercase">{article.category}</span>
//               <h3 className="text-lg font-bold text-[#421983] my-2">{article.title}</h3>
//               <p className="text-gray-600 text-sm mb-4">{article.description}</p>
//               <div className="flex items-center justify-between text-xs text-gray-500">
//                 <span>{article.author}</span>
//                 <span>{article.date}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default LatestArticles;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import endpoints from "@/constraints/apiConfig";
import imagePath from "@/constraints/imagepath";

interface Article {
  _id: string;
  title: string;
  category: string;
  description: string;
  author: { username?: string };
  createdAt: string;
  coverImage: string;
}

const LatestArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.getAllarticles);
        const data = await response.json();

        if (data.success) {
          // Limit to the latest 3 articles
          const sorted = data.data.sort((a: Article, b: Article) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setArticles(sorted.slice(0, 3));
        } else {
          console.error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
        <Link to="/all-articles" className="text-[#421983] text-sm font-semibold hover:underline">
          View All
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={`${imagePath}${article.coverImage}`}
              alt={article.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <span className="text-xs font-semibold text-[#F35E21] uppercase">
                {article.category}
              </span>
              <h3 className="text-lg font-bold text-[#421983] my-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{article.author?.username || "Unknown Author"}</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <Link
                to={`/ArtArticlePage/${article._id}`}
                className="text-[#421983] text-sm font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
