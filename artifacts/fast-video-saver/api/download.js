export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'POST method chahiye'
    });
  }

  try {
    const { url } = req.body;

    // URL validation
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid URL dalo'
      });
    }

    // =========================
    // YOUTUBE
    // =========================
    if (url.includes('youtube.com') || url.includes('youtu.be')) {

      let videoId = '';

      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      }

      if (!videoId) {
        return res.status(400).json({
          success: false,
          error: 'YouTube video ID nahi mila'
        });
      }

      return res.status(200).json({
        success: true,
        platform: 'YouTube',
        title: 'YouTube Video Ready',
        size: 'HD',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        videoUrl: `https://inv.riverside.rocks/api/v1/videos/${videoId}`
      });
    }

    // =========================
    // INSTAGRAM
    // =========================
    if (url.includes('instagram.com')) {

      let shortcode = '';

      if (url.includes('/reel/')) {
        shortcode = url.split('/reel/')[1]?.split('/')[0];
      } else if (url.includes('/p/')) {
        shortcode = url.split('/p/')[1]?.split('/')[0];
      }

      if (!shortcode) {
        return res.status(400).json({
          success: false,
          error: 'Instagram shortcode nahi mila'
        });
      }

      return res.status(200).json({
        success: true,
        platform: 'Instagram',
        title: 'Instagram Reel Ready',
        size: 'HD',
        videoUrl: `https://instasave.io/download?url=https://instagram.com/p/${shortcode}/`
      });
    }

    // =========================
    // PINTEREST
    // =========================
    if (url.includes('pinterest')) {

      return res.status(200).json({
        success: true,
        platform: 'Pinterest',
        title: 'Pinterest Video Ready',
        size: 'HD',
        videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`
      });
    }

    // Unsupported
    return res.status(400).json({
      success: false,
      error: 'Sirf YouTube, Instagram, ya Pinterest links support hain'
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: 'Server error',
      details: err.message
    });

  }
}
