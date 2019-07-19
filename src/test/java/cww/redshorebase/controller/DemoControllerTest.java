package cww.redshorebase.controller;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.List;

public class DemoControllerTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void redisDemo() {

        List<String> list1 = new ArrayList<String>();
        list1.add("a1");
        list1.add("a2");
        list1.add("a3");

        List<String> list2 = new ArrayList<String>();
        list2.add("b1");
        list2.add("b2");
        list2.add("b3");


        redisTemplate.opsForList().leftPush("listkey1", list1);
        redisTemplate.opsForList().rightPush("listkey2", list2);


        List<String> resultList6 = (List<String>) redisTemplate.opsForList().leftPop("listkey6");

        List<String> resultList2 = (List<String>) redisTemplate.opsForList().rightPop("listkey2");


    }
}