export default async function handler(req, res) {

  // =========================
  // CORS
  // =========================

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );

  // =========================
  // OPTIONS
  // =========================

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // =========================
  // ONLY POST
  // =========================

  if (req.method !== 'POST') {

    return res.status(405).json({
      success: false,
      error: 'POST method required'
    });
  }

  try {

    const { url } = req.body;

    // =========================
    // URL VALIDATION
    // =========================

    if (!url || typeof url !== 'string') {

      return res.status(400).json({
        success: false,
        error: 'Valid URL required'
      });
    }

    // =========================
    // YOUTUBE
    // =========================

    if (
      url.includes('youtube.com') ||
      url.includes('youtu.be')
    ) {

      let id = '';

      // youtu.be
      if (url.includes('youtu.be/')) {

        id = url
          .split('youtu.be/')[1]
          ?.split('?')[0];
      }

      // youtube.com
      else if (url.includes('v=')) {

        id = url
          .split('v=')[1]
          ?.split('&')[0];
      }

      if (!id) {

        return res.status(400).json({
          success: false,
          error: 'Invalid YouTube URL'
        });
      }

      return res.status(200).json({

        success: true,

        platform: 'YouTube',

        title: 'YouTube Video Ready',

        size: 'HD',

        thumbnail:
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,

        videoUrl:
          `https://inv.riverside.rocks/api/v1/videos/${id}`
      });
    }

    // =========================
    // INSTAGRAM
    // =========================

    if (url.includes('instagram.com')) {

      return res.status(400).json({

        success: false,

        error:
          'Instagram downloader under maintenance'
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

        videoUrl:
          `https://pinterestvideodownloader.com/download?url=${encodeURIComponent(url)}`
      });
    }

    // =========================
    // UNSUPPORTED
    // =========================

    return res.status(400).json({

      success: false,

      error:
        'Only YouTube and Pinterest supported currently'
    });

  } catch (err) {

    return res.status(500).json({

      success: false,

      error: 'Server Error',

      details: err.message
    });
  }
}
