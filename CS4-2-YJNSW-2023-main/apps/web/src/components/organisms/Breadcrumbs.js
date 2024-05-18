import routes from "../../routes";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import cms from "../../api-clients/cms";

function Breadcrumbs() {
  const { roleId } = useParams();
  const { toRoleId } = useParams();
  const lastPage = document.referrer.substring(document.referrer.lastIndexOf("/"));
  const location = useLocation();
  const hashVal = location.hash;
  const firstUpdate = useRef(true);
  const [roleInfo, setRoleInfo] = useState({ data: {} });
  const nav = useNavigate();

  (!sessionStorage.getItem("roleId") && roleId) || (sessionStorage.getItem("roleId") && roleId)
    ? sessionStorage.setItem("roleId", roleId)
    : "";
  (!sessionStorage.getItem("toRoleId") && toRoleId) ||
  (sessionStorage.getItem("toRoleId") && toRoleId)
    ? sessionStorage.setItem("toRoleId", toRoleId)
    : "";

  lastPage === "/overview"
    ? sessionStorage.setItem("lastPage", lastPage)
    : lastPage === "/progression"
    ? sessionStorage.setItem("lastPage", lastPage)
    : "";

  const sRoleId = sessionStorage.getItem("roleId");
  const sToRoleId = sessionStorage.getItem("toRoleId");
  const sLastPage = sessionStorage.getItem("lastPage");

  const fetchRoleInfo = useCallback(async () => {
    let res = await cms.getRoleInfo(roleId);
    let resToRole = {};
    if (toRoleId) {
      resToRole = await cms.getRoleInfo(toRoleId);
    }
    if (
      (res.error && res.error.status === 404) ||
      (resToRole.error && resToRole.error.status === 404)
    ) {
      nav("page-not-found", { replace: true });
      return;
    }
    setRoleInfo(res);
  });

  useEffect(() => {
    if (firstUpdate.current && roleId) {
      fetchRoleInfo();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  }, []);

  let currentPath = location.pathname + location.hash;
  currentPath = currentPath.replace(`${sRoleId}`, ":roleId");
  currentPath = currentPath.replace(`${sToRoleId}`, ":toRoleId");
  if (location.hash) {
    currentPath = currentPath.replace(`${hashVal}`, "");
  }

  const currentPageRoute = routes[findIndex(routes, currentPath, sLastPage)];
  const currentPageRouteIndex = findIndex(routes, currentPath, sLastPage);

  const crumbs = routes.map((route, index) => {
    if (index === currentPageRouteIndex) {
      return currentPageRoute.breadcrumbName.map((name, index) => {
        return (
          <li key={name}>
            <a
              href={
                currentPageRoute.breadcrumbPath[index].includes(":roleId")
                  ? (currentPageRoute.breadcrumbPath[index] = currentPageRoute.breadcrumbPath[
                      index
                    ].replace(":roleId", `${sRoleId}`))
                  : currentPageRoute.breadcrumbPath[index] ||
                    currentPageRoute.breadcrumbPath[index].includes(":toRoleId")
                  ? (currentPageRoute.breadcrumbPath[index] = currentPageRoute.breadcrumbPath[
                      index
                    ].replace(":toRoleId", `${sToRoleId}`))
                  : currentPageRoute.breadcrumbPath[index]
              }
              className={currentPageRoute.breadcrumbPath.length - 1 === index ? "current" : null}
            >
              {name === "Role Overview" ? roleInfo.data?.attributes?.roleName : name}
            </a>
          </li>
        );
      });
    } else if (currentPageRouteIndex == null && index < 1) {
      return null;
    }
  });

  return (
    <div className="nsw-container">
      <nav aria-label="Breadcrumbs" className="nsw-breadcrumbs">
        <ol>{crumbs}</ol>
      </nav>
    </div>
  );
}

const findIndex = (arr, currentPath, page) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].path == currentPath && (arr[i].lastPage == page || arr[i].lastPage == null)) {
      return i;
    }
  }
};

export default Breadcrumbs;
