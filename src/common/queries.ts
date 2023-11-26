export const ALL_LOCATIONS = `query Locations($user_id: String!) {
    locations(user_id: $user_id) {
      _id
      name {
        display
        street
        city
        country
        address
        postal
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

export const RECOMMENDED_LOCATIONS = `query stuff($user_id: String!, $num_recommendations: Int) {
  recommendedLocations(user_id: $user_id, num_recommendations: $num_recommendations) {
    rank
    location {
      latitude
      longitude
    }
    city
    country
    elevation
    avg_temp
    trewartha
    climate_zone
  }
}`;
