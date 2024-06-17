'use strict';

module.exports = {
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(({ nexus }) => {
      const { extendInputType, extendType } = nexus;

      // Extend the UsersPermissionsRegisterInput input type to include phone and address
      const ExtendedUsersPermissionsRegisterInput = extendInputType({
        type: 'UsersPermissionsRegisterInput',
        definition(t) {
          t.string('phone'); // Add phone field as String
          t.string('address'); // Add address field
          t.string('first_name'); // Add first_name field
          t.string('last_name'); // Add last_name field
        },
      });

      // Extend the UsersPermissionsMe type to include the new fields
      const ExtendedUsersPermissionsMe = extendType({
        type: 'UsersPermissionsMe',
        definition(t) {
          t.string('phone'); // Add phone field as String
          t.string('address'); // Add address field
          t.string('first_name'); // Add first_name field
          t.string('last_name'); // Add last_name field
        },
      });

      return {
        types: [ExtendedUsersPermissionsRegisterInput, ExtendedUsersPermissionsMe],
      };
    });
  },

  bootstrap(/*{ strapi }*/) {},
};
