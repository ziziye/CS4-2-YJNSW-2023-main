function LearningSideNav() {
  return (
    <nav
      className="nsw-side-nav"
      aria-labelledby="sksm726ns"
      style={{ position: "sticky", top: "5px" }}
    >
      <div className="nsw-side-nav__header" id="sksm726ns">
        <a>Activities</a>
      </div>
      <ul>
        <li>
          <a href="#resources">Resources: Workplace Learning</a>
        </li>
        <li>
          <a href="#capabilities">Capabilities: Assisted Learning</a>
        </li>
        <li>
          <a href="#goals">Goals: Formal Learning</a>
        </li>
      </ul>
    </nav>
  );
}
export default LearningSideNav;
