'use strict'

module.exports = {
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension')

    extensionService.use(({ nexus }) => {
      const { extendInputType, extendType } = nexus

      // Extend the UsersPermissionsRegisterInput input type to include phone and address
      const ExtendedUsersPermissionsRegisterInput = extendInputType({
        type: 'UsersPermissionsRegisterInput',
        definition(t) {
          t.string('phone')
          t.string('address')
          t.string('first_name')
          t.string('last_name')
        },
      })

      // Extend the UsersPermissionsMe type to include the new fields
      const ExtendedUsersPermissionsMe = extendType({
        type: 'UsersPermissionsMe',
        definition(t) {
          t.string('phone')
          t.string('address')
          t.string('first_name')
          t.string('last_name')
        },
      })

      // Define the mutation to update the authenticated user's information
      const updateMeMutation = extendType({
        type: 'Mutation',
        definition(t) {
          t.field('updateMe', {
            type: 'UsersPermissionsMe',
            args: {
              data: nexus.inputObjectType({
                name: 'UpdateMeInput',
                definition(t) {
                  t.string('phone')
                  t.string('address')
                  t.string('first_name')
                  t.string('last_name')
                },
              }),
            },
            async resolve(_root, { data }, { state: { user } }) {
              if (!user) {
                throw new Error('You must be authenticated to update your profile')
              }

              const updatedUser = await strapi
                .plugin('users-permissions')
                .service('user')
                .edit(user.id, data)

              return updatedUser
            },
          })
        },
      })

      return {
        types: [ExtendedUsersPermissionsRegisterInput, ExtendedUsersPermissionsMe, updateMeMutation],
      }
    })
  },

  bootstrap(/*{ strapi }*/) {
  },
}
