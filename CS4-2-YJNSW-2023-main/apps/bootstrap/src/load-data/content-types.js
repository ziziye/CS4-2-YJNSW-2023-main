import createCapabilityTypes from "./capability-types/create.js";
import createCapabilityLevels from "./capability-levels/create.js";
import createGoalTypes from "./goal-types/create.js";
import createGoalSubtypes from "./goal-subtypes/create.js";
import createStreams from "./streams/create.js";
import createActivityTypes from "./activity-types/create.js";
import createActivities from "./activities/create.js";
import relateActivities from "./activities/relate.js";
import createGoals from "./goals/create.js";
import relateGoals from "./goals/relate.js";
import createCapabilities from "./capabilities/create.js";
import relateCapabilities from "./capabilities/relate.js";
import createJobRoles from "./job-roles/create.js";
import relateJobRoles from "./job-roles/relate.js";
import relateRoleProgressions from "./role-progressions/relate.js";

export const contentTypes = [
  { name: "capability-types", create: createCapabilityTypes },
  { name: "capability-levels", create: createCapabilityLevels },
  { name: "capabilities", create: createCapabilities },
  { name: "activity-types", create: createActivityTypes },
  { name: "activities", create: createActivities },
  { name: "goal-types", create: createGoalTypes },
  { name: "goal-subtypes", create: createGoalSubtypes },
  { name: "goals", create: createGoals },
  { name: "streams", create: createStreams },
  { name: "job-roles", create: createJobRoles },
  { name: "capabilities", relate: relateCapabilities },
  { name: "activities", relate: relateActivities },
  { name: "goals", relate: relateGoals },
  { name: "job-roles", relate: relateJobRoles },
  { name: "role-progressions", relate: relateRoleProgressions },
];
