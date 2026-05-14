export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    const response = await fetch('https://api.cobalt.tools/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ url: url.trim() }),
    });

    const data = await response.json();

    if (data.status === 'redirect' || data.status === 'stream' || data.status === 'tunnel') {
      return res.status(200).json({ success: true, videoUrl: data.url });
    }
    
    if (data.status === 'picker') {
      return res.status(200).json({ success: true, videoUrl: data.picker?.[0]?.url });
    }

    return res.status(200).json({ success: false, error: data.error?.code || 'Could not process this URL' });

  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error: ' + error.message });
  }
}
