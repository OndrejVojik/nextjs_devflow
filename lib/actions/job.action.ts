export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const result = await response.json();

    const transformedResult = result
      .filter((country: { name?: { common?: string } }) => country.name?.common)
      .map((country: { name: { common: string } }) => country.name.common)
      .sort((a: string, b: string) => a.localeCompare(b)); // Explicitly typed parameters for sorting
    return transformedResult;
  } catch (error) {
    console.log("fetchCountries error:", error);
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const headers: Record<string, string> = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "", // Ensure it defaults to an empty string
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  console.log("fetchJobs query:", query);
  console.log("fetchJobs page:", page);

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
    {
      headers,
    }
  );

  console.log("fetchJobs response status:", response.status);

  const result = await response.json();

  // console.log("fetchJobs result:", result);

  return result.data;
};
