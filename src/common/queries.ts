export const ALL_LOCATIONS = `query Locations($user_id: String!) {
    locations(user_id: $user_id) {
      _id
      name {
        display
        country
      }
      location {
        latitude
        longitude
      }
      elevation
      avg_temp
      trewartha
      climate_zone
    }
  }`;
