export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST method chahiye' });
  }
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL dalo' });
  }
  
  // YouTube
  if (url.includes('youtube') || url.includes('youtu.be')) {
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
        videoUrl: `https://inv.riverside.rocks/api/v1/videos/${videoId}`
      });
    }
  }
  
  // Instagram - Direct video link
  if (url.includes('instagram')) {
    let shortcode = '';
    if (url.includes('/reel/')) {
      shortcode = url.split('/reel/')[1].split('/')[0];
    } else if (url.includes('/p/')) {
      shortcode = url.split('/p/')[1].split('/')[0];
    }
    
    if (shortcode) {
      // Direct Instagram video URL
      return res.status(200).json({
        success: true,
        platform: 'Instagram',
        videoUrl: `https://www.instagram.com/p/${shortcode}/media/?size=l`
      });
    }
  }
  
  // Pinterest
  if (url.includes('pinterest')) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const html = await response.text();
      let match = html.match(/videoUrl":"([^"]+\.mp4[^"]*)"/);
      if (!match) match = html.match(/contentUrl":"([^"]+\.mp4[^"]*)"/);
      
      if (match) {
        return res.status(200).json({
          success: true,
          platform: 'Pinterest',
          videoUrl: match[1].replace(/\\/g, '')
        });
      }
    } catch(e) {}
    
    return res.status(200).json({
      success: false,
      error: 'Pinterest video not found'
    });
  }
  
  return res.status(200).json({
    success: false,
    error: 'Only YouTube, Instagram, Pinterest'
  });
}
