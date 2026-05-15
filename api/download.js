export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });
  
  if (url.includes('youtube') || url.includes('youtu.be')) {
    let id = url.includes('youtu.be/') ? url.split('youtu.be/')[1].split('?')[0] : url.split('v=')[1].split('&')[0];
    return res.json({ success: true, platform: 'YouTube', videoUrl: `https://inv.riverside.rocks/api/v1/videos/${id}` });
  }
  if (url.includes('instagram')) {
    let code = url.includes('/reel/') ? url.split('/reel/')[1].split('/')[0] : url.split('/p/')[1].split('/')[0];
    return res.json({ success: true, platform: 'Instagram', videoUrl: `https://instasave.io/download?url=https://instagram.com/p/${code}/` });
  }
  if (url.includes('pinterest')) {
    return res.json({ success: true, platform: 'Pinterest', videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}` });
  }
  return res.json({ success: false, error: 'YouTube, Instagram, ya Pinterest link daalo' });
}
