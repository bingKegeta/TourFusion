//* User specfic Mutations

export const REGISTER = `mutation AddUser($email: String!, $username: String!, $password: String!) {
                          addUser(email: $email, username: $username, password: $password)
                        }
`;

export const LOGIN = `mutation Login($emailorusername: String!, $password: String!) {
                        login(emailOrUsername: $emailorusername, password: $password)
                      }`;

//* Location Specific Mutations
export const ADD_LOCATION = `mutation AddLocation($user_id: String!, $name: LocationNameInput!, $latitude: Float!, $longitude: Float!) {
                              addLocation(user_id: $user_id, name: $name, latitude: $latitude, longitude: $longitude)
                            }`;

export const DELETE_LOCATION = `mutation delete($id: String!) {
                                  deleteLocation(_id: $id)
                                }`;

export const UPDATE_LOCATION = `mutation update($id: String!, $newData: LocationInput) {
                                  updateLocation(_id: $id, updatedData: $newData) {
                                    name {
                                      display
                                    }
                                  }
                                }`;
