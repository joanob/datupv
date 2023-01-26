module.exports = {
  routes: [
     {
      method: 'POST',
      path: '/backup/save',
      handler: 'backup.save',
      config: {
         policies: ["global::adminAuth"],
         auth: false
      },
     },
     {
      method: 'POST',
      path: '/backup/download',
      handler: 'backup.download',
      config: {
         policies: ["global::adminAuth"],
         auth: false
      },
     },
  ],
};
