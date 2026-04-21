export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { endpoint } = req.query;
  if (!endpoint) { res.status(400).json({ erro: 'endpoint obrigatório' }); return; }

  const MF_TOKEN = process.env.MF_TOKEN;

  try {
    const response = await fetch('https://api.multifoco.app' + endpoint, {
      headers: {
        'Authorization': 'Bearer ' + MF_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
