export default async function handler(req, res) {
  const response = await fetch('https://api.api-ninjas.com/v1/facts?limit=10', {
    method: 'GET',
    headers: { 'X-Api-Key': process.env.FACTS_API_KEY },
    contentType: 'application/json',
  });
  const responseJson = await response.json();
  res.status(200).json({ facts: responseJson });
}
