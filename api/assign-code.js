// 兑换码分配 API

module.exports = (req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // 添加这些头，防止被拒绝
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 预生成的随机兑换码池（50个）
  const codePool = [
    'X7K2-P9LN-M4QW', '8H3J-N2RV-6TSY', '4M6P-Q2R8-W9X3',
    '5N8L-R3T7-Y1ZB', '2V6W-S4K9-J8GD', '1C4F-H6M2-N5BQ',
    '9T3V-K7J1-L8WP', '6Y9R-U5D2-G4HZ', '3B8N-F1X4-M7ST',
    '7A2C-E5H8-L6QR', '4D7G-J2N6-V9WY', '1K5P-S9T3-W2XB',
    '8M1R-F4C6-H7LQ', '2Z6Y-U8D3-N4GV', '5L3J-Q1W7-K9RT',
    '3H6V-M2X5-P8SC', '9B4N-F7K1-J3WH', '6E2R-T5Y8-L1ZA',
    '1S8W-G4C6-N2DH', '7P3V-Q6J9-M5XB', '2L5H-U1N4-R8ST',
    '4D9K-F3W6-V7QC', '8A2M-J5R1-Y4GH', '3T6N-S8L2-Z1WP',
    '5C1V-E4X7-B3KL', '6Y3P-H9W8-N2RF', '1G7U-M4Q2-T6DV',
    '9L2K-J6C1-S5WX', '2B8R-F5N3-Y4HT', '7S4V-L1Q6-P8YZ',
    '3W5D-G2M9-H1JK', '4Z7T-Y3K8-R6NP', '1A9C-E6V2-W3LQ',
    '8H1B-N4S7-J2XM', '5P6L-U8W1-K3VR', '2C4F-Q9T3-Y5HZ',
    '7J3D-M1G6-L8SA', '6X2R-V5Y9-N4BP', '3K8W-H1L4-C2QM',
    '9N5Z-T7J1-R3XF', '4S1V-E8C6-P2WY', '1B3G-U6L9-Q4HZ',
    '7D2M-F4K8-S6TN', '2W9A-J5R1-Y3VS', '8P4L-C7H2-N1GT',
    '5Y6B-Q3W8-M2KL', '3E1Z-V9X4-H7RP', '6T8D-N2S5-L4WC'
  ];

  const urlCode = req.query.code || (req.body && req.body.code);
  
  if (urlCode) {
    const upperCode = urlCode.toUpperCase();
    if (codePool.includes(upperCode)) {
      res.status(200).json({ success: true, code: upperCode });
    } else {
      res.status(200).json({ success: false, message: '兑换码无效' });
    }
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * codePool.length);
  const code = codePool[randomIndex];
  
  res.status(200).json({ success: true, code: code });
};
