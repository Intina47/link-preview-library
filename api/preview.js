const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { url } = req.query;
    console.log("Server received a req with url: ", url);

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const getTitle = () => $('meta[property="og:title"]').attr('content') || $('title').text();
        const getDescription = () => $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
        const getImage = () => $('meta[property="og:image"]').attr('content');

        const metadata = {
            title: getTitle(),
            description: getDescription(),
            image: getImage(),
            url
        };

        res.status(200).json(metadata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch the URL' });
    }
};
