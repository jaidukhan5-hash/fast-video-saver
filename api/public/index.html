export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST method chahiye' });
  }
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL dalo bhai' });
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
        videoUrl: `https://inv.riverside.rocks/api/v1/videos/${videoId}`,
        message: 'Click below to download'
      });
    }
  }
  
  // Instagram - Direct working service
  if (url.includes('instagram')) {
    let shortcode = '';
    if (url.includes('/reel/')) {
      shortcode = url.split('/reel/')[1].split('/')[0].split('?')[0];
    } else if (url.includes('/p/')) {
      shortcode = url.split('/p/')[1].split('/')[0].split('?')[0];
    }
    
    if (shortcode) {
      return res.status(200).json({
        success: true,
        platform: 'Instagram',
        videoUrl: `https://instasave.io/download?url=https://instagram.com/p/${shortcode}/`,
        message: 'Link open karo, phir Download button dabao'
      });
    }
  }
  
  // Pinterest
  if (url.includes('pinterest')) {
    return res.status(200).json({
      success: true,
      platform: 'Pinterest',
      videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`,
      message: 'Link open karo, phir Download button dabao'
    });
  }
  
  return res.status(200).json({
    success: false,
    error: 'YouTube, Instagram, ya Pinterest link daalo'
  });
}
