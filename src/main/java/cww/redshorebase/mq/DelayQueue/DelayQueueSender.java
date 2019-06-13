package cww.redshorebase.mq.DelayQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DelayQueueSender {

    private static final Logger logger = LoggerFactory.getLogger(DelayQueueSender.class);
    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 延迟队列
     *
     * @param
     */
    public void testDelayQueuePerMessageTTL() throws InterruptedException {
        for (int i = 5; i <= 7; i++) {
            long expiration = i * 1000;
            rabbitTemplate.convertAndSend("delay_queue_per_message_ttl",
                    (Object) ("Message From delay_queue_per_message_ttl with expiration " + expiration),
                    new ExpirationMessagePostProcessor(expiration));
        }
    }
}
