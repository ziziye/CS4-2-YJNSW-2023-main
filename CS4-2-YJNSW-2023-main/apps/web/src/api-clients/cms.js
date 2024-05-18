const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;

const defaultHeaders = {
  Authorization: `bearer ${localStorage.getItem("strapiToken")}`,
};

const apis = {
  getTitle: async () => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/homepage-titles/1`, {
      headers: defaultHeaders,
    });

    return await res.json();
  },
  getHomeGuide: async () => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/home-guides/${1}?populate=*`, {
      headers: defaultHeaders,
    });

    return await res.json();
  },
  getRoles: async (searchCriteria) => {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/job-roles${getSearchQueryParams(
        searchCriteria
      )}&filters[isDisplay][$eq]=true`,
      {
        headers: defaultHeaders,
      }
    );

    return await res.json();
  },
  getAllRoles: async () => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/job-roles`, {
      headers: defaultHeaders,
    });

    return await res.json();
  },

  getRoleInfo: async (roleId) => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/job-roles/${roleId}?populate=*`, {
      headers: defaultHeaders,
    });

    return await res.json();
  },

  getAllRoleDetails: async (roleId) => {
    const res = await fetch(
      // `${STRAPI_BASE_URL}/api/job-roles/${roleId}?populate[activities][populate]=*`,
      `${STRAPI_BASE_URL}/api/job-roles/${roleId}?populate[activities][populate]=*&populate[resources][populate]=*`,
      {
        headers: defaultHeaders,
      }
    );

    return await res.json();
  },

  getRoleProgressionDetails: async (roleId) => {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/role-progressions?filters[fromRole]=${roleId}&populate=toRole&pagination[pageSize]=100`,
      {
        headers: defaultHeaders,
      }
    );

    return await res.json();
  },

  getRoleCapability: async (roleId) => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/job-roles/${roleId}?populate[0]=capabilities`, {
      headers: defaultHeaders,
    });
    return await res.json();
  },

  getCapabilities: async () => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/capabilities?pagination[pageSize]=1000`, {
      headers: defaultHeaders,
    });
    return await res.json();
  },

  getRolesProgression: async (searchCriteria, roleId) => {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/role-progressions${getRoleProgressionQueryParams(
        searchCriteria
      )}&filters[fromRole]=${roleId}&populate=toRole`,
      {
        headers: defaultHeaders,
      }
    );

    return await res.json();
  },

  getGoals: async (fromrole, toRole) => {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/role-progressions?filters[fromRole]=${fromrole}&filters[toRole]=${toRole}&populate[goals][populate]=*`,
      {
        headers: defaultHeaders,
      }
    );

    return await res.json();
  },

  getGoalsFilter: async (fromrole, toRole, filter) => {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/role-progressions?filters[fromRole]=${fromrole}&filters[toRole]=${toRole}&populate[goals][populate]=*&populate[goals][filters][goalType][goalTypeName]=${filter}`,
      {
        headers: defaultHeaders,
      }
    );

    return await res.json();
  },

  getAllGoals: async () => {
    const res = await fetch(`${STRAPI_BASE_URL}/api/goals?populate=*`, {
      headers: defaultHeaders,
    });

    return await res.json();
  },
};

function getSearchQueryParams(searchCriteria) {
  let queryString = "?sort[0]=roleName";

  queryString += `&pagination[pageSize]=10&pagination[page]=${searchCriteria.page}`;

  if (searchCriteria.searchTerm) {
    queryString += `&filters[roleName][$containsi]=${searchCriteria.searchTerm}`;
  }

  if (searchCriteria.streamFilters) {
    searchCriteria.streamFilters.forEach((streamFilter) => {
      queryString += `&filters[streams][streamName][$eq]=${streamFilter}`;
    });
  }

  if (searchCriteria.identifiedFilter === "Identified Only") {
    queryString += "&filters[isIdentified][$eq]=true";
  } else if (searchCriteria.identifiedFilter === "Non-Identified Only") {
    queryString += "&filters[isIdentified][$eq]=false";
  }

  return queryString;
}

function getRoleProgressionQueryParams(searchCriteria) {
  let queryString = `?pagination[pageSize]=100`;

  if (searchCriteria.searchTerm) {
    queryString += `&filters[toRole][roleName][$containsi]=${searchCriteria.searchTerm}`;
  }

  if (searchCriteria.streamFilters) {
    for (let i = 0; i < searchCriteria.streamFilters.length; i++) {
      queryString += `&filters[$or][${i}][toRole][streams][streamName][$eq]=${searchCriteria.streamFilters[i]}`;
    }
  }

  if (searchCriteria.identifiedFilter === "Identified Only") {
    queryString += `&filters[$and][${searchCriteria.streamFilters.length}][toRole][isIdentified][$eq]=true`;
  } else if (searchCriteria.identifiedFilter === "Non-Identified Only") {
    queryString += `&filters[$and][${searchCriteria.streamFilters.length}][toRole][isIdentified][$eq]=false`;
  }

  return queryString;
}

export default apis;
