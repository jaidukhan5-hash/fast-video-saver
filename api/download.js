export default async function handler(req, res) {
  // Allow anyone to use this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST method' });
  }
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    // ==================== INSTAGRAM (Working with Apify) ====================
    if (url.includes('instagram.com') || url.includes('instagr.am')) {
      // Extract shortcode from URL
      let shortcode = '';
      if (url.includes('/reel/')) {
        shortcode = url.split('/reel/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/p/')) {
        shortcode = url.split('/p/')[1].split('/')[0].split('?')[0];
      } else if (url.includes('/tv/')) {
        shortcode = url.split('/tv/')[1].split('/')[0].split('?')[0];
      }
      
      if (!shortcode) {
        return res.status(200).json({
          success: false,
          error: 'Could not extract Instagram video ID'
        });
      }
      
      // Try multiple free Instagram download services (backup method)
      const services = [
        `https://instasave.io/download?url=https://www.instagram.com/p/${shortcode}/`,
        `https://saveinsta.app/en?url=https://www.instagram.com/p/${shortcode}/`,
        `https://insta-save.com/download?url=https://www.instagram.com/p/${shortcode}/`
      ];
      
      return res.status(200).json({
        success: true,
        platform: 'Instagram',
        videoUrl: services[0],
        title: 'Instagram Video',
        message: '📸 Click the link below, then click Download button on that page',
        altLinks: services.slice(1)
      });
    }
    
    // ==================== PINTEREST (Working - Direct MP4 Extract) ====================
    if (url.includes('pinterest.com') || url.includes('pin.it')) {
      try {
        // Pinterest page fetch karo
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml'
          }
        });
        
        const html = await response.text();
        
        // Multiple patterns to find video URL
        let videoUrl = null;
        
        // Pattern 1: videoUrl in JSON
        let match = html.match(/videoUrl":"([^"]+\.mp4[^"]*)"/);
        if (match) videoUrl = match[1];
        
        // Pattern 2: contentUrl
        if (!videoUrl) {
          match = html.match(/contentUrl":"([^"]+\.mp4[^"]*)"/);
          if (match) videoUrl = match[1];
        }
        
        // Pattern 3: direct mp4 link
        if (!videoUrl) {
          match = html.match(/https:\/\/[^"'\s]+\.mp4/);
          if (match) videoUrl = match[0];
        }
        
        if (videoUrl) {
          videoUrl = videoUrl.replace(/\\/g, '');
          return res.status(200).json({
            success: true,
            platform: 'Pinterest',
            videoUrl: videoUrl,
            title: 'Pinterest Video',
            message: '📌 Direct download link below!'
          });
        } else {
          // Fallback - Pinterest downloader website
          return res.status(200).json({
            success: true,
            platform: 'Pinterest',
            videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`,
            title: 'Pinterest Video',
            message: '📌 Click link below, then click Download button on that page'
          });
        }
      } catch (error) {
        return res.status(200).json({
          success: true,
          platform: 'Pinterest',
          videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`,
          title: 'Pinterest Video',
          message: '📌 Open this link to download'
        });
      }
    }
    
    // ==================== YOUTUBE ====================
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
          videoUrl: `https://inv.riverside.rocks/api/v1/videos/${videoId}`,
          title: 'YouTube Video',
          message: '✅ Click to download'
        });
      }
    }
    
    return res.status(200).json({
      success: false,
      error: 'Please provide YouTube, Instagram, or Pinterest URL'
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error: ' + error.message
    });
  }
}
