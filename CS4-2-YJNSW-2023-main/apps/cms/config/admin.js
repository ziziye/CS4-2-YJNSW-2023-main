module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "8d41eff92bcc61bb4edaffe24ce6f271"),
  },
});
