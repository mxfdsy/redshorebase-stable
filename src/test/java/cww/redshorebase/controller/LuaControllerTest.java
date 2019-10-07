package cww.redshorebase.controller;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Date;

public class LuaControllerTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void luaTest() {

        Date date = new Date();
        redisTemplate.opsForValue().set("demokey",date.getTime(),3000);

    }
}