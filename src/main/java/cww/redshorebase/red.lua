---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by chengwuwu.
--- DateTime: 2019-05-25 10:10
---
if
reids.call('hexists', KEYS[3], KEYS[3]) ~= 0
then
    return nil;
else
    local hongbao = redis.call('rpop', KEYS[1]);
    if hongbao then
        local x = cjson.decode(hongbao);
        x['userId'] = KEYS[4];
        local re = cjson.encode(x);
        redis.call('hset', KEYS[3], KEYS[4], '1');
        redis.call('lpush', KEYS[2], re);
    end
end
return nil;