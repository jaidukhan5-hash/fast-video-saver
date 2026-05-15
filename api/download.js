export default async function handler(req, res) {

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS support
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Use POST request'
    });
  }

  try {

    const { url } = req.body;

    // URL validation
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid URL required'
      });
    }

    // =========================
    // YOUTUBE
    // =========================
    if (url.includes('youtube.com') || url.includes('youtu.be')) {

      let id = '';

      if (url.includes('youtu.be/')) {
        id = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('v=')) {
        id = url.split('v=')[1]?.split('&')[0];
      }

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Invalid YouTube link'
        });
      }

      return res.status(200).json({
        success: true,
        platform: 'YouTube',
        title: 'YouTube Video Ready',
        size: 'HD',
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        videoUrl: `https://inv.riverside.rocks/api/v1/videos/${id}`
      });
    }

    // =========================
    // INSTAGRAM
    // =========================
    if (url.includes('instagram.com')) {

      return res.status(200).json({
        success: true,
        platform: 'Instagram',
        title: 'Instagram Reel Ready',
        size: 'HD',
        videoUrl: `https://fastvideosave.net`
      });
    }

    // =========================
    // PINTEREST
    // =========================
    if (url.includes('pinterest.com')) {

      return res.status(200).json({
        success: true,
        platform: 'Pinterest',
        title: 'Pinterest Video Ready',
        size: 'HD',
        videoUrl: `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`
      });
    }

    // =========================
    // UNSUPPORTED
    // =========================
    return res.status(400).json({
      success: false,
      error: 'Only YouTube, Instagram, and Pinterest links supported'
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: 'Server Error',
      details: err.message
    });

  }
}
