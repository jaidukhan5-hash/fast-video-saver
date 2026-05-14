export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
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
    // Instagram ke liye
    if (url.includes('instagram.com') || url.includes('instagr.am')) {
      const data = await getInstagramVideo(url);
      return res.status(200).json(data);
    }

    // Pinterest ke liye  
    if (url.includes('pinterest.com') || url.includes('pin.it')) {
      const data = await getPinterestVideo(url);
      return res.status(200).json(data);
    }

    // YouTube ke liye
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const data = await getYouTubeVideo(url);
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Platform not supported yet' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getInstagramVideo(url) {
  try {
    const embedUrl = url.replace('/reel/', '/reel/embed/').replace('/p/', '/p/embed/');
    
    const response = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
      },
    });

    const html = await response.text();
    const videoMatch = html.match(/"video_url":"([^"]+)"/);
    
    if (!videoMatch) {
      return { success: false, error: 'Instagram video not found. May be private.' };
    }

    const videoUrl = videoMatch[1].replace(/\\/g, '');
    
    // REAL size nikaalne ke liye
    const sizeResponse = await fetch(videoUrl, { method: 'HEAD' });
    const contentLength = sizeResponse.headers.get('content-length');
    const size = contentLength ? (parseInt(contentLength) / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown';

    return {
      success: true,
      platform: 'Instagram',
      videoUrl: videoUrl,
      size: size,
      title: 'Instagram Video',
    };
  } catch (error) {
    return { success: false, error: 'Instagram fetch failed: ' + error.message };
  }
}

async function getPinterestVideo(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = await response.text();
    const videoMatch = html.match(/"contentUrl":"([^"]+\.mp4[^"]*)"/) || 
                       html.match(/"url":"([^"]+\.mp4[^"]*)"/);

    if (!videoMatch) {
      return { success: false, error: 'Pinterest video not found. May be an image.' };
    }

    const videoUrl = videoMatch[1].replace(/\\/g, '');
    
    // REAL size
    const sizeResponse = await fetch(videoUrl, { method: 'HEAD' });
    const contentLength = sizeResponse.headers.get('content-length');
    const size = contentLength ? (parseInt(contentLength) / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown';

    return {
      success: true,
      platform: 'Pinterest',
      videoUrl: videoUrl,
      size: size,
      title: 'Pinterest Video',
    };
  } catch (error) {
    return { success: false, error: 'Pinterest fetch failed: ' + error.message };
  }
}

async function getYouTubeVideo(url) {
  try {
    const response = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ url: url, downloadMode: 'auto' }),
    });

    const data = await response.json();
    
    if (data.url) {
      // Size nikaalne ki koshish
      const sizeResponse = await fetch(data.url, { method: 'HEAD' });
      const contentLength = sizeResponse.headers.get('content-length');
      const size = contentLength ? (parseInt(contentLength) / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown';
      
      return {
        success: true,
        platform: 'YouTube',
        videoUrl: data.url,
        size: size,
        title: data.title || 'YouTube Video',
      };
    }
    
    return { success: false, error: 'YouTube fetch failed' };
  } catch (error) {
    return { success: false, error: 'YouTube fetch failed: ' + error.message };
  }
}
