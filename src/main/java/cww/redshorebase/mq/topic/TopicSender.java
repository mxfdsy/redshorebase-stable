package cww.redshorebase.mq.topic;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TopicSender {


    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send() {
        String msg1 = "I am topic.cww.001.q1 mesaage msg======";
        System.out.println("TopicSender send the 1st : " + msg1);
        this.rabbitTemplate.convertAndSend("topic.cww.exchange", "topic.log.error.error", "我是由 topic.log.error.error发送的消息");
        this.rabbitTemplate.convertAndSend("topic.cww.exchange", "topic.log.warn.normal", "我是由 topic.log.warn.normal 发送的消息");
        this.rabbitTemplate.convertAndSend("topic.cww.exchange", "topic.log.info.normal", "我是由 topic.log.info.normal发送的消息");
    }
}
