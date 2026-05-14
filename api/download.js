export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST method' });
  }
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    // ==================== YOUTUBE ====================
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
      }
      
      if (videoId) {
        return res.status(200).json({
          success: true,
          platform: 'YouTube',
          videoUrl: `https://inv.riverside.rocks/api/v1/videos/${videoId}`,
          title: 'YouTube Video',
          message: '✅ Click below to download'
        });
      }
    }
    
    // ==================== INSTAGRAM (WORKING) ====================
    if (url.includes('instagram.com') || url.includes('instagr.am')) {
      let shortcode = '';
      
      // Extract shortcode from different URL patterns
      if (url.includes('/reel/')) {
        shortcode = url.split('/reel/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/p/')) {
        shortcode = url.split('/p/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/tv/')) {
        shortcode = url.split('/tv/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/reel/embed/')) {
        shortcode = url.split('/reel/embed/')[1].split('/')[0];
      }
      
      if (shortcode) {
        // Multiple working Instagram download services
        const instaServices = [
          `https://instasave.io/download?url=https://www.instagram.com/p/${shortcode}/`,
          `https://saveinsta.app/en?url=https://www.instagram.com/p/${shortcode}/`,
          `https://insta-save.com/download?url=https://www.instagram.com/p/${shortcode}/`
        ];
        
        return res.status(200).json({
          success: true,
          platform: 'Instagram',
          videoUrl: instaServices[0],
          title: 'Instagram Video',
          message: '📸 Click the link and then click Download button on the next page',
          alternativeLinks: instaServices
        });
      }
    }
    
    // ==================== PINTEREST (WORKING) ====================
    if (url.includes('pinterest.com') || url.includes('pin.it')) {
      try {
        // Fetch Pinterest page and extract video
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        const html = await response.text();
        
        // Multiple patterns to find video URL
        let videoUrl = null;
        
        // Pattern 1
        let match = html.match(/videoUrl":"([^"]+\.mp4[^"]*)"/);
        if (match) videoUrl = match[1];
        
        // Pattern 2
        if (!videoUrl) {
          match = html.match(/contentUrl":"([^"]+\.mp4[^"]*)"/);
          if (match) videoUrl = match[1];
        }
        
        // Pattern 3
        if (!videoUrl) {
          match = html.match(/"url":"([^"]+\.mp4[^"]*)"/);
          if (match) videoUrl = match[1];
        }
        
        // Pattern 4 - direct mp4
        if (!videoUrl) {
          match = html.match(/https:\/\/[^"]+\.mp4/);
          if (match) videoUrl = match[0];
        }
        
        if (videoUrl) {
          videoUrl = videoUrl.replace(/\\/g, '');
          return res.status(200).json({
            success: true,
            platform: 'Pinterest',
            videoUrl: videoUrl,
            title: 'Pinterest Video',
            message: '📌 Click below to download your Pinterest video'
          });
        } else {
          // Fallback Pinterest download service
          return res.status(200).json({
            success: true,
            platform: 'Pinterest',
            videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`,
            title: 'Pinterest Video',
            message: '📌 Click link below, then click Download button on the website'
          });
        }
      } catch (error) {
        // Fallback if fetch fails
        return res.status(200).json({
          success: true,
          platform: 'Pinterest',
          videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`,
          title: 'Pinterest Video',
          message: '📌 Open this link and click Download'
        });
      }
    }
    
    // ==================== NO PLATFORM MATCHED ====================
    return res.status(200).json({
      success: false,
      error: '❌ Please provide a valid YouTube, Instagram, or Pinterest URL',
      example: 'YouTube: https://youtu.be/... , Instagram: https://www.instagram.com/reel/... , Pinterest: https://www.pinterest.com/pin/...'
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server error: ' + error.message 
    });
  }
}
