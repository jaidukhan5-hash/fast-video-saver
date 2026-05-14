export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST method' });
  }
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    // YouTube only (working)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      }
      
      if (videoId) {
        return res.status(200).json({
          success: true,
          platform: 'YouTube',
          videoUrl: `https://pipedproxy.kavin.rocks/streams/${videoId}`,
          title: 'YouTube Video'
        });
      }
    }
    
    return res.status(200).json({
      success: false,
      error: 'Only YouTube videos work currently. Instagram API is blocked.'
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
