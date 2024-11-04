const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/gerar-client-id-secret', (req, res) => {
    const clientId = crypto.randomBytes(16).toString('hex');
    const clientSecret = crypto.randomBytes(32).toString('hex');
    res.json({
        client_id: clientId,
        client_secret: clientSecret
    });
});

module.exports = router;
