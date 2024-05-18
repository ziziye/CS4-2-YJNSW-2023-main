const apis = {
  login: async (username, password) => {
    if (password) {
      console.log("successful fake login");
      return {
        success: true,
        idToken: { roleId: 1 },
        strapiToken: process.env.REACT_APP_STRAPI_BEARER_TOKEN,
      };
    } else {
      console.log("unsuccessful fake login");
      return { success: false };
    }
  },
};

export default apis;
