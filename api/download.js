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
    // ========== YOUTUBE ==========
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      
      // Handle youtu.be format
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      // Handle youtube.com watch?v= format
      else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      }
      // Handle youtube.com/embed/ format
      else if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
      }
      
      if (videoId) {
        // Using multiple free APIs for YouTube
        const downloadUrl = `https://api.onlinevideoconverter.pro/api/convert?url=https://www.youtube.com/watch?v=${videoId}`;
        
        return res.status(200).json({
          success: true,
          platform: 'YouTube',
          videoUrl: `https://pipedproxy.kavin.rocks/streams/${videoId}`,
          title: 'YouTube Video',
          message: 'Click the link to download'
        });
      }
    }
    
    // ========== INSTAGRAM (Working method) ==========
    if (url.includes('instagram.com') || url.includes('instagr.am')) {
      // Extract shortcode from Instagram URL
      let shortcode = '';
      if (url.includes('/reel/')) {
        shortcode = url.split('/reel/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/p/')) {
        shortcode = url.split('/p/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/tv/')) {
        shortcode = url.split('/tv/')[1].split('/')[0].split('?')[0];
      }
      
      if (shortcode) {
        // Using public Instagram API endpoint
        const videoUrl = `https://www.instagram.com/p/${shortcode}/media/?size=l`;
        
        return res.status(200).json({
          success: true,
          platform: 'Instagram',
          videoUrl: videoUrl,
          title: 'Instagram Video',
          message: 'Note: May download as image if video not available'
        });
      }
    }
    
    // ========== PINTEREST ==========
    if (url.includes('pinterest.com') || url.includes('pin.it')) {
      try {
        // Pinterest video extraction
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        const html = await response.text();
        
        // Try multiple patterns for video URL
        let videoMatch = html.match(/videoUrl":"([^"]+\.mp4[^"]*)"/);
        if (!videoMatch) {
          videoMatch = html.match(/contentUrl":"([^"]+\.mp4[^"]*)"/);
        }
        if (!videoMatch) {
          videoMatch = html.match(/mp4":"([^"]+)"/);
        }
        
        if (videoMatch) {
          const videoUrl = videoMatch[1].replace(/\\/g, '');
          return res.status(200).json({
            success: true,
            platform: 'Pinterest',
            videoUrl: videoUrl,
            title: 'Pinterest Video',
            message: 'Video found!'
          });
        }
      } catch (e) {
        // Fallback
      }
      
      return res.status(200).json({
        success: false,
        platform: 'Pinterest',
        error: 'Could not extract video. Try a different Pinterest video.'
      });
    }
    
    // ========== NO PLATFORM MATCHED ==========
    return res.status(200).json({
      success: false,
      error: 'Please provide a valid YouTube, Instagram, or Pinterest URL'
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server error: ' + error.message 
    });
  }
}
