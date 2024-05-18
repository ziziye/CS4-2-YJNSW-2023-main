export default [
  // {
  //   path: "/",
  //   breadcrumbName: ["Home"],
  //   breadcrumbPath: ["/"],
  // },
  {
    path: "/search",
    breadcrumbName: ["Home", "Search"],
    breadcrumbPath: ["/", "/search"],
  },
  {
    path: "/roles/:roleId/overview",
    breadcrumbName: ["Home", "Search", "Role Overview"],
    breadcrumbPath: ["/", "/search", "/roles/:roleId/overview"],
  },
  {
    lastPage: "/overview",
    path: "/roles/:roleId/learning",
    breadcrumbName: ["Home", "Search", "Role Overview", "Development Activities"],
    breadcrumbPath: ["/", "/search", "/roles/:roleId/overview", "/roles/:roleId/learning"],
  },
  {
    path: "/roles/:roleId/progression",
    breadcrumbName: ["Home", "Search", "Role Overview", "Career Progression"],
    breadcrumbPath: ["/", "/search", "/roles/:roleId/overview", "/roles/:roleId/progression"],
  },
  {
    lastPage: "/progression",
    path: "/roles/:roleId/learning",
    breadcrumbName: [
      "Home",
      "Search",
      "Role Overview",
      "Career Progression",
      "Development Activities",
    ],
    breadcrumbPath: [
      "/",
      "/search",
      "/roles/:roleId/overview",
      "/roles/:roleId/progression",
      "/roles/:roleId/learning",
    ],
  },
  {
    path: "/roles/:roleId/comparison/:toRoleId",
    breadcrumbName: [
      "Home",
      "Search",
      "Role Overview",
      "Career Progression",
      "Capability Comparison",
    ],
    breadcrumbPath: [
      "/",
      "/search",
      "/roles/:roleId/overview",
      "/roles/:roleId/progression",
      "/roles/:roleId/comparison/:toRoleId",
    ],
  },
  {
    path: "/roles/:roleId/goals/:toRoleId",
    breadcrumbName: [
      "Home",
      "Search",
      "Role Overview",
      "Career Progression",
      "Capability Comparison",
      "Goals",
    ],
    breadcrumbPath: [
      "/",
      "/search",
      "/roles/:roleId/overview",
      "/roles/:roleId/progression",
      "/roles/:roleId/comparison/:toRoleId",
      "/roles/:roleId/goals/:toRoleId",
    ],
  },
  {
    path: "/roles/:roleId/goals/selected/:toRoleId",
    breadcrumbName: [
      "Home",
      "Search",
      "Role Overview",
      "Career Progression",
      "Capability Comparison",
      "Goals",
      "Review Goals",
    ],
    breadcrumbPath: [
      "/",
      "/search",
      "/roles/:roleId/overview",
      "/roles/:roleId/progression",
      "/roles/:roleId/comparison/:toRoleId",
      "/roles/:roleId/goals/:toRoleId",
      "/roles/:roleId/goals/selected/:toRoleId",
    ],
  },
];
