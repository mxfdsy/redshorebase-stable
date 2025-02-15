package cww.redshorebase.controller;

import cww.redshorebase.config.JedisUtils;
import cww.redshorebase.constants.Constants;
import cww.redshorebase.model.Orders;
import cww.redshorebase.model.Users;
import cww.redshorebase.mq.DelayQueue.DelayQueueSender;
import cww.redshorebase.mq.Direct.DirectSender;
import cww.redshorebase.mq.fanout.FanoutSender;
import cww.redshorebase.mq.topic.TopicSender;
import cww.redshorebase.multidatasource.aliyun.OrdersMapper;
import cww.redshorebase.multidatasource.localhost.UsersMapper;
import cww.redshorebase.service.DemoService;
import cww.redshorebase.util.ResultBuilderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
public class DemoController {
    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);


    @Autowired
    private DemoService demoService;

//    @Autowired
//    @Qualifier(value = "direct_rabbitmq_send_channel")
//    private MessageChannel directRabbitmqSendChannel;

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private OrdersMapper ordersMapper;

    @Autowired
    private DirectSender directSender;

    @Autowired
    private FanoutSender fanoutSender;

    @Autowired
    private JedisUtils jedisUtils;

    @Autowired
    private TopicSender topicSender;


    @Autowired
    private DelayQueueSender delayQueueSender;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @RequestMapping(value = "/globalExceptionDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String globalException() {
        int a = 1 / 0;
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }

    /**
     * redis
     *
     * @return
     */
    @RequestMapping(value = "/jedisDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String redisDemo() {
//        ValueOperations<String, String> ops = redisTemplate.opsForValue();
//        ops.set("name", "enjoy");
//        String value = ops.get("name");
//        System.out.println(value);
        jedisUtils.set("cww999", "999");
        String cww999 = jedisUtils.get("cww999");
        System.out.println(cww999);


        List<String> list1 = new ArrayList<String>();
        list1.add("a1");
        list1.add("a2");
        list1.add("a3");

        List<String> list2 = new ArrayList<String>();
        list2.add("b1");
        list2.add("b2");
        list2.add("b3");


        redisTemplate.opsForList().leftPushAll("listkey1", list1);
        redisTemplate.opsForList().rightPushAll("listkey2", list2);


        String listkey6 = redisTemplate.opsForList().leftPop("listkey6");

        List<String> listkey1 = redisTemplate.opsForList().range("listkey1", 0, -1);
        List<String> listkey9 = redisTemplate.opsForList().range("listkey9", 0, -1);
        String listkey2 = redisTemplate.opsForList().rightPop("listkey2");


        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }

    /**
     * redis rank
     */

    @RequestMapping(value = "/redisRank", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String redisRank(String payload) {
        redisTemplate.delete("zset001");
        redisTemplate.opsForZSet().incrementScore("zset001", "001", 100);
        redisTemplate.opsForZSet().incrementScore("zset001", "002", 50);
        Set<ZSetOperations.TypedTuple<String>> daoList = redisTemplate.opsForZSet().reverseRangeWithScores("zset001", 0, -1);
        Set<ZSetOperations.TypedTuple<String>> zhengList = redisTemplate.opsForZSet().rangeWithScores("zset001", 0, -1);

        System.out.println("daoList");
        daoList.forEach(n -> {
            System.out.println(n.getScore());
            System.out.println(n.getValue());
        });
        System.out.println("zhengList");
        zhengList.forEach(n -> {
            System.out.println(n.getScore());
            System.out.println(n.getValue());
        });
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }

    /**
     * rabbimmq demo
     */
    @RequestMapping(value = "/rabbitmqDirect", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void rabbitmqDirect() {
//        directRabbitmqSendChannel.send(MessageBuilder.withPayload("rabbitmqDemo message = hello").build());
        directSender.send("我是点对点的消息");
    }

    @RequestMapping(value = "/rabbitmqfanout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void rabbitmqFanout() {
//        directRabbitmqSendChannel.send(MessageBuilder.withPayload("rabbitmqDemo message = hello").build());
        fanoutSender.fanoutSend("我是fanout的消息");
    }

    @RequestMapping(value = "/rabbitmqTopic", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void rabbitmqTopic() {
//        directRabbitmqSendChannel.send(MessageBuilder.withPayload("rabbitmqDemo message = hello").build());
//        topicSender.fanoutSend("我是fanout的消息");

        topicSender.send();
    }


    /**
     * 延迟队列
     */
    @RequestMapping(value = "/DelayQueue", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void DelayQueue() {
//        directRabbitmqSendChannel.send(MessageBuilder.withPayload("rabbitmqDemo message = hello").build());
        try {
            delayQueueSender.testDelayQueuePerMessageTTL();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    /**
     * 延时重试
     */
    @RequestMapping(value = "/retry", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void retry() {
//        directRabbitmqSendChannel.send(MessageBuilder.withPayload("rabbitmqDemo message = hello").build());
        try {
            delayQueueSender.retry();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    /**
     * 分布式事物
     */
    @RequestMapping(value = "/multiDatabase", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @Transactional
    public void multiDatabase() {
        Users users = new Users();
        users.setUsername("ZZZ");
        users.setPasswd("123456");
        usersMapper.insert(users);


        int i = 1 / 0;

        Orders orders = new Orders();
        orders.setAccount(0002);
        orders.setUserId(9999);
        orders.setName("mac pro");
        ordersMapper.insert(orders);
    }

    /**
     * redis 缓存
     *
     * @param payload
     * @return
     */
    @RequestMapping(value = "/cacheDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String cacheDemo(String payload) {
        int a = 1;
        Orders orderFromAliYun = demoService.getOrderFromAliYun(a);
        System.out.println(orderFromAliYun.toString());
        return ResultBuilderUtils.buildSuccess(orderFromAliYun);
    }

    @RequestMapping(value = "/put", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String put(Users users) {
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }



    @RequestMapping(value = "/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String get(Users users) {
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }

}
