package cww.alittlegirl.controller;

import cww.alittlegirl.constants.Constants;
import cww.alittlegirl.mq.Sender;
import cww.alittlegirl.util.ResultBuilderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class DemoController {
    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);


//    @Autowired
//    @Qualifier(value = "direct_rabbitmq_send_channel")
//    private MessageChannel directRabbitmqSendChannel;

    @Autowired
    private Sender sender;

    @Resource
    private RedisTemplate<String,String> redisTemplate;

    @RequestMapping(value = "/globalExceptionDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String globalException() {
        int a = 1 / 0;
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }


    @RequestMapping(value = "/redisDemo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String redisDemo() {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        ops.set("name", "enjoy");
        String value = ops.get("name");
        System.out.println(value);
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


}
