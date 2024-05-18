module.exports = {
  types: [
    {
      value: "feat",
      name: "feat:     A new feature",
    },
    {
      value: "fix",
      name: "fix:      A bug fix",
    },
    {
      value: "docs",
      name: "docs:     Documentation only changes",
    },
    {
      value: "style",
      name: "style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)",
    },
    {
      value: "refactor",
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "test",
      name: "test:     Adding missing tests",
    },
    {
      value: "chore",
      name: "chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation",
    },
    {
      value: "revert",
      name: "revert:   Revert to a commit",
    },
    {
      value: "wip",
      name: "wip:      Work in progress",
    },
  ],

  scopes: [],

  allowTicketNumber: false,

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer: "Enter the JIRA ticket this commit relates to (optional). E.g.: YJNSWCPT-123:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  allowCustomScopes: false,
  allowBreakingChanges: ["feat", "fix"],
  skipQuestions: ["scope", "body"],
  subjectLimit: 100,
  footerPrefix: "JIRA:",
};
