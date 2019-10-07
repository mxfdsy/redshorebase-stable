local feeKey = KEYS[1];
local nowTime = tonumber(KEYS[2]);
local timeOut = tonumber(KEYS[3]);
local beforeTime = redis.call('get',feeKey);
local numberBeforeTime = tonumber(beforeTime);
if beforeTime  == nil then
    return 000;
end

if nowTime - numberBeforeTime >= timeOut then
    redis.call('del',feeKey);
    return 1;
else
    return 0;
end
