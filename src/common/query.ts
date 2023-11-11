export async function queryGraphQL(endpoint: string, queryString: string) {
    let addLocationQuery = JSON.stringify({
      query: queryString
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: addLocationQuery,
    });
    const data = await response.json();
    return data;
}