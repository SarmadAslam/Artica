

const Base_Url = "http://localhost:3000/api/v1"



const endpoints = {
    signup : `${Base_Url}/auth/signup`,
    login : `${Base_Url}/auth/login`,
    getprofile : `${Base_Url}/auth/getprofile`,
    getbyId : `${Base_Url}/showartwork/getbyId`,
    getbyCategroy : `${Base_Url}/showartwork/getArtworkByCategory`,
    bidpost : `${Base_Url}/bids/create`,
    postArtWork : `${Base_Url}/showartwork/create`,
    editProfile : `${Base_Url}/auth/updateUserProfile`,
    uploadArtwork : "/art/create",
    getAllArtsWork : `${Base_Url}/showartwork/auctionsartworks`,
    getAllpurchaseartWorks : `${Base_Url}/showartwork/purchaseartworks`,

    deleteArt : `${Base_Url}/showartwork/delete`,


    createPaymentIntent: '/showartwork/:id/create-payment-intent',
  confirmPayment: '/showartwork/confirm-payment',
  getUserPurchases: '/showartwork/user-purchases',
  getAllarticles  : `${Base_Url}/article/all`,

  getArticlebyId : `${Base_Url}/article/getById`,

  getAllUsers : `${Base_Url}/auth/getAllUsers`,


  postComment : `${Base_Url}/articlecomment/create`,

  postCheckout : `${Base_Url}/stripe/checkout`,

  postArticle : `${Base_Url}/article/create`,

  getUserById : `${Base_Url}/auth/users`,

  getmyArticles : `${Base_Url}/article/my-articles`,

  stripeconfirm : `${Base_Url}/stripe/confirm`,

  postartWorkComment : `${Base_Url}/comment/create`,

  deleteArtwork : `${Base_Url}/showartwork/delete`,

  getbidHistory :  `${Base_Url}/bids/history`












}


export default endpoints