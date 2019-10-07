package cww.redshorebase.controller.lua;

import cww.redshorebase.constants.Constants;
import cww.redshorebase.util.RedisUtils;
import cww.redshorebase.util.ResultBuilderUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.http.MediaType;
import org.springframework.scripting.support.ResourceScriptSource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@RestController
@Log4j2
public class LuaController {
    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private RedisUtils redisUtils;




    @Bean
    public DefaultRedisScript defaultRedisScript() {
        DefaultRedisScript defaultRedisScript = new DefaultRedisScript<>();
        defaultRedisScript.setScriptSource(new ResourceScriptSource(new
                ClassPathResource("/redis/demo.lua")));
        return defaultRedisScript;
    }

    @RequestMapping(value = "/luaTest", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String luaTest() throws InterruptedException {

        JedisUtils jedis = new JedisUtils(Basic.ip, Basic.port, Basic.auth);

        Date date = new Date();
        long time = date.getTime();
        redisTemplate.opsForValue().set("demokey", time, 10, TimeUnit.SECONDS);



        String s = "local feeKey = KEYS[1];\n" +
                "local nowTime = tonumber(KEYS[2]);\n" +
                "local timeOut = tonumber(KEYS[3]);\n" +
                "local beforeTime = redis.call('get',feeKey);\n" +
                "local numberBeforeTime = tonumber(beforeTime);\n" +
                "if beforeTime  == nil then\n" +
                "    return numberBeforeTime;\n" +
                "end\n" +
                "\n" +
                "if nowTime - numberBeforeTime < timeOut then\n" +
                "    redis.call('del',feeKey);\n" +
                "    return 1;\n" +
                "else\n" +
                "    return 0;\n" +
                "end";
        Thread.sleep(7000);

        Date date1 = new Date();
        Object demokey = jedis.eval(s, 3, "demokey", String.valueOf(date1.getTime()), "5000", "");

//        Date date2 = new Date();
        System.out.println(date1.getTime() -date.getTime());

        System.out.println(demokey);
//        redisUtils.deleteFeeKey("demokey", String.valueOf(date1.getTime()), "5000");

        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }

}
