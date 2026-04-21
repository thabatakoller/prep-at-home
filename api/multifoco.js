export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const MF_TOKEN = process.env.MF_TOKEN;
  
  if (!MF_TOKEN) {
    res.status(500).json({ erro: 'MF_TOKEN não configurado' });
    return;
  }

  // endpoint vem como query param: /api/multifoco?endpoint=/v1/calendar
  const endpoint = req.query.endpoint;
  
  if (!endpoint) {
    res.status(400).json({ erro: 'endpoint obrigatório. Ex: ?endpoint=/v1/calendar' });
    return;
  }

  try {
    const url = 'https://api.multifoco.app' + endpoint;
    const response = await fetch(url, {
      method: 'GET',
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
