export const REGISTER = `mutation AddUser($email: String!, $username: String!, $password: String!) {
  addUser(email: $email, username: $username, password: $password)
}
`;

export const LOGIN = `mutation Login($emailorusername: String!, $password: String!) {
  login(emailOrUsername: $emailorusername, password: $password)
}`;
