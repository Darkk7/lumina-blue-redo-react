export default async function handler(req, res) {
  const apiToken = process.env.PASSPORT_API_TOKEN;
  if (!apiToken) {
    return res.status(500).json({ error: 'API token not configured in environment variables.' });
  }

  try {
    const apiRes = await fetch('https://passport.nevadacloud.com/api/v1/practice', {
      headers: {
        'Authorization': `Bearer ${apiToken}`
      }
    });
    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return res.status(apiRes.status).json({ error: errText });
    }
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
