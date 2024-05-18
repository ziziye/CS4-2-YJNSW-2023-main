function GoalFilters() {
  return (
    <form className="nsw-filters nsw-filters--fixed js-filters">
      <div className="nsw-filters__controls active">
        <button>
          <span
            className="material-icons nsw-material-icons"
            // focusable="false"
            aria-hidden="true"
          >
            tune
          </span>
          <span>Filter Goals</span>
        </button>
      </div>
      <div className="nsw-filters__wrapper">
        <div className="nsw-filters__back">
          <button
            className="nsw-icon-button nsw-icon-button--flex js-close-sub-nav"
            type="button"
            aria-expanded="true"
            aria-controls="sub-nav-"
          >
            <span
              className="material-icons nsw-material-icons"
              // focusable="false"
              aria-hidden="true"
            >
              keyboard_arrow_left
            </span>
            <span>Back</span>
          </button>
        </div>
        <div className="nsw-side-nav__header">
          <h4>Goal types</h4>
        </div>
        <h4>Types</h4>
        <div className="nsw-filters_list">
          <div className="nsw-filters_item">
            <fieldset className="nsw-form__fieldset">
              <div className="nsw-grid">
                <div className="nsw-col nsw-col-sm-6 ">
                  <input
                    className="nsw-form__checkbox-input"
                    type="checkbox"
                    name="filters-batch-categories"
                    value="performance"
                    id="filters-batch-categories-1"
                  />
                  <label className="nsw-form__checkbox-label" htmlFor="filters-batch-categories-1">
                    Performance
                  </label>
                  <input
                    className="nsw-form__checkbox-input"
                    type="checkbox"
                    name="filters-batch-categories"
                    value="development"
                    id="filters-batch-categories-2"
                  />
                  <label className="nsw-form__checkbox-label" htmlFor="filters-batch-categories-2">
                    Development
                  </label>
                  <input
                    className="nsw-form__checkbox-input"
                    type="checkbox"
                    name="filters-batch-categories"
                    value="capability"
                    id="filters-batch-categories-3"
                  />
                  <label className="nsw-form__checkbox-label" htmlFor="filters-batch-categories-3">
                    Capability
                  </label>
                </div>
                <div className="nsw-col nsw-col-sm-6 ">
                  <input
                    className="nsw-form__checkbox-input"
                    type="checkbox"
                    name="filters-batch-categories"
                    value="70"
                    id="filters-batch-categories-4"
                  />
                  <label className="nsw-form__checkbox-label" htmlFor="filters-batch-categories-4">
                    70
                  </label>
                  <input
                    className="nsw-form__checkbox-input"
                    type="checkbox"
                    name="filters-batch-categories"
                    value="20"
                    id="filters-batch-categories-5"
                  />
                  <label className="nsw-form__checkbox-label" htmlFor="filters-batch-categories-5">
                    20
                  </label>
                  <input
                    className="nsw-form__checkbox-input"
                    type="checkbox"
                    name="filters-batch-categories"
                    value="10"
                    id="filters-batch-categories-6"
                  />
                  <label className="nsw-form__checkbox-label" htmlFor="filters-batch-categories-6">
                    10
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="nsw-filters__accept">
            <button type="submit" className="nsw-button nsw-button--dark-outline-solid">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default GoalFilters;
