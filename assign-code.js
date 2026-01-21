// 兑换码分配 API - Vercel Serverless Function

// 存储兑换码分配状态（内存存储，生产环境建议使用数据库）
var codeRegistry = {};

// 初始化兑换码池
var VALID_CODES = [
  'A001-0001-0001', 'A001-0001-0002', 'A001-0001-0003', 'A001-0001-0004', 'A001-0001-0005',
  'A001-0001-0006', 'A001-0001-0007', 'A001-0001-0008', 'A001-0001-0009', 'A001-0001-0010',
  'A001-0001-0011', 'A001-0001-0012', 'A001-0001-0013', 'A001-0001-0014', 'A001-0001-0015',
  'A001-0001-0016', 'A001-0001-0017', 'A001-0001-0018', 'A001-0001-0019', 'A001-0001-0020',
  'A001-0001-0021', 'A001-0001-0022', 'A001-0001-0023', 'A001-0001-0024', 'A001-0001-0025',
  'A001-0001-0026', 'A001-0001-0027', 'A001-0001-0028', 'A001-0001-0029', 'A001-0001-0030',
  'A001-0001-0031', 'A001-0001-0032', 'A001-0001-0033', 'A001-0001-0034', 'A001-0001-0035',
  'A001-0001-0036', 'A001-0001-0037', 'A001-0001-0038', 'A001-0001-0039', 'A001-0001-0040',
  'A001-0001-0041', 'A001-0001-0042', 'A001-0001-0043', 'A001-0001-0044', 'A001-0001-0045',
  'A001-0001-0046', 'A001-0001-0047', 'A001-0001-0048', 'A001-0001-0049', 'A001-0001-0050'
];

// 预初始化所有兑换码
VALID_CODES.forEach(function(code) {
  codeRegistry[code] = {
    used: false,
    deviceId: null,
    activateTime: null
  };
});

// 生成设备ID
function generateDeviceId(req) {
  var components = [
    req.headers['user-agent'] || '',
    req.headers['accept-language'] || '',
    req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '',
    (req.headers['sec-ch-ua'] || '') + (req.headers['sec-ch-ua-platform'] || '')
  ];
  
  var hash = 0;
  var str = components.join('|');
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'DEV_' + Math.abs(hash).toString(16).toUpperCase();
}

module.exports = function(req, res) {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  var deviceId = generateDeviceId(req);
  var action = req.query.action || req.body.action;

  if (action === 'getCode') {
    // 获取或分配兑换码
    var urlCode = req.query.code || req.body.code;
    
    // 如果URL中有指定兑换码，直接使用
    if (urlCode) {
      var upperCode = urlCode.toUpperCase();
      if (codeRegistry.hasOwnProperty(upperCode)) {
        // 标记该设备已使用此码
        codeRegistry[upperCode].used = true;
        codeRegistry[upperCode].deviceId = deviceId;
        codeRegistry[upperCode].activateTime = Date.now();
        
        res.json({
          success: true,
          code: upperCode,
          message: '使用指定兑换码'
        });
      } else {
        res.json({
          success: false,
          message: '兑换码无效'
        });
      }
      return;
    }
    
    // 检查该设备是否已有分配的兑换码
    var existingCode = null;
    var keys = Object.keys(codeRegistry);
    for (var i = 0; i < keys.length; i++) {
      var code = keys[i];
      if (codeRegistry[code].deviceId === deviceId) {
        var expireTime = 24 * 60 * 60 * 1000;
        if (Date.now() - codeRegistry[code].activateTime < expireTime) {
          existingCode = code;
          break;
        }
      }
    }
    
    if (existingCode) {
      res.json({
        success: true,
        code: existingCode,
        message: '返回用户，使用已有兑换码'
      });
      return;
    }
    
    // 分配新兑换码
    var assignedCode = null;
    for (var j = 0; j < VALID_CODES.length; j++) {
      var codeToAssign = VALID_CODES[j];
      if (!codeRegistry[codeToAssign].used) {
        codeRegistry[codeToAssign].used = true;
        codeRegistry[codeToAssign].deviceId = deviceId;
        codeRegistry[codeToAssign].activateTime = Date.now();
        assignedCode = codeToAssign;
        break;
      }
    }
    
    if (assignedCode) {
      res.json({
        success: true,
        code: assignedCode,
        message: '系统自动分配兑换码'
      });
    } else {
      res.json({
        success: false,
        message: '所有兑换码已分配完毕'
      });
    }
  } else if (action === 'checkCode') {
    // 验证兑换码是否有效
    var codeToCheck = req.query.code || req.body.code;
    if (codeToCheck && codeRegistry.hasOwnProperty(codeToCheck)) {
      var data = codeRegistry[codeToCheck];
      var isValid = false;
      var message = '';
      
      if (!data.used) {
        isValid = true;
        message = '兑换码可用';
      } else if (data.deviceId === deviceId) {
        var remaining = 24 * 60 * 60 * 1000 - (Date.now() - data.activateTime);
        if (remaining > 0) {
          isValid = true;
          message = '您的设备，剩余 ' + Math.round(remaining / 1000 / 60) + ' 分钟';
        } else {
          message = '兑换码已过期';
        }
      } else {
        message = '兑换码已在其他设备使用';
      }
      
      res.json({
        success: isValid,
        code: codeToCheck,
        message: message
      });
    } else {
      res.json({
        success: false,
        message: '兑换码无效'
      });
    }
  } else if (action === 'stats') {
    // 获取统计信息
    var usedCount = 0;
    var totalCount = VALID_CODES.length;
    Object.keys(codeRegistry).forEach(function(code) {
      if (codeRegistry[code].used) usedCount++;
    });
    
    res.json({
      success: true,
      total: totalCount,
      used: usedCount,
      available: totalCount - usedCount
    });
  } else {
    res.json({
      success: false,
      message: '未知操作'
    });
  }
};