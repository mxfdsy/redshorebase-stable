package cww.redshorebase.controller;

import cww.redshorebase.config.JedisUtils;
import cww.redshorebase.constants.Constants;
import cww.redshorebase.model.Orders;
import cww.redshorebase.model.Users;
import cww.redshorebase.mq.Sender;
import cww.redshorebase.multidatasource.aliyun.OrdersMapper;
import cww.redshorebase.multidatasource.localhost.UsersMapper;
import cww.redshorebase.service.DemoService;
import cww.redshorebase.util.ResultBuilderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

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
    private Sender sender;

    @Autowired
    private JedisUtils jedisUtils;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @RequestMapping(value = "/globalExceptionDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String globalException() {
        int a = 1 / 0;
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }


    @RequestMapping(value = "/redisDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String redisDemo() {
//        ValueOperations<String, String> ops = redisTemplate.opsForValue();
//        ops.set("name", "enjoy");
//        String value = ops.get("name");
//        System.out.println(value);
        jedisUtils.set("cww999", "999");
        String cww999 = jedisUtils.get("cww999");
        System.out.println(cww999);
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }


    @RequestMapping(value = "/rabbitmqDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void rabbitmqDemo() {
//        directRabbitmqSendChannel.send(MessageBuilder.withPayload("rabbitmqDemo message = hello").build());
//
        //simple
        sender.send();
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

    @RequestMapping(value = "/cacheDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String cacheDemo(String payload) {
        int a = 1;
        Orders orderFromAliYun = demoService.getOrderFromAliYun(a);
        System.out.println(orderFromAliYun.toString());
        return ResultBuilderUtils.buildSuccess(orderFromAliYun);
    }


}
