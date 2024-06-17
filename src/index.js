'use strict'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension')

    extensionService.use(({ nexus }) => {
      const { extendInputType } = nexus

      // Extend the UsersPermissionsRegisterInput input type to include phone and address
      const ExtendedUsersPermissionsRegisterInput = extendInputType({
        type: 'UsersPermissionsRegisterInput',
        definition(t) {
          t.string('address') // Add address field
          t.string('first_name') // Add first_name field
          t.string('last_name') // Add last_name field
          t.number('phone')  // Add phone field
        },
      })

      return {
        types: [ExtendedUsersPermissionsRegisterInput],
      }
    })
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
  },
}
