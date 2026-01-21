// 兑换码分配 API - Vercel Serverless Function

// 生成随机兑换码
function generateRandomCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = '';
  for (var i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += '-';
  for (var i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += '-';
  for (var i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 生成不重复的随机码
function generateUniqueCode(existingCodes) {
  var maxAttempts = 100;
  for (var i = 0; i < maxAttempts; i++) {
    var code = generateRandomCode();
    if (!existingCodes.has(code)) {
      return code;
    }
  }
  return generateRandomCode();
}

module.exports = (req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 存储兑换码分配状态
  if (!global.codeRegistry) {
    global.codeRegistry = {};
    global.usedCodes = new Set();
    
    // 预生成50个随机兑换码
    for (var i = 0; i < 50; i++) {
      var code = generateUniqueCode(global.usedCodes);
      global.usedCodes.add(code);
      global.codeRegistry[code] = { used: false, deviceId: null, activateTime: null };
    }
  }

  var action = req.query.action || (req.body && req.body.action);
  var urlCode = req.query.code || (req.body && req.body.code);
  
  // 生成设备ID
  var ua = req.headers['user-agent'] || '';
  var ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '';
  var hash = 0;
  var str = ua + '|' + ip;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  var deviceId = 'DEV_' + Math.abs(hash).toString(16).toUpperCase();

  if (action === 'getCode') {
    if (urlCode) {
      var upperCode = urlCode.toUpperCase();
      if (global.codeRegistry[upperCode]) {
        global.codeRegistry[upperCode].used = true;
        global.codeRegistry[upperCode].deviceId = deviceId;
        global.codeRegistry[upperCode].activateTime = Date.now();
        res.json({ success: true, code: upperCode });
      } else {
        res.json({ success: false, message: '兑换码无效' });
      }
      return;
    }
    
    var keys = Object.keys(global.codeRegistry);
    for (var j = 0; j < keys.length; j++) {
      var code = keys[j];
      if (global.codeRegistry[code].deviceId === deviceId) {
        var remaining = 24 * 60 * 60 * 1000 - (Date.now() - global.codeRegistry[code].activateTime);
        if (remaining > 0) {
          res.json({ success: true, code: code });
          return;
        }
      }
    }
    
    for (var k = 0; k < keys.length; k++) {
      var codeToAssign = keys[k];
      if (!global.codeRegistry[codeToAssign].used) {
        global.codeRegistry[codeToAssign].used = true;
        global.codeRegistry[codeToAssign].deviceId = deviceId;
        global.codeRegistry[codeToAssign].activateTime = Date.now();
        res.json({ success: true, code: codeToAssign });
        return;
      }
    }
    
    res.json({ success: false, message: '所有兑换码已分配完毕' });
  } else {
    res.json({ success: false, message: '未知操作' });
  }
};
