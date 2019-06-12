package cww.redshorebase.mq.fanout;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FanoutSender {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * Fanout
     *
     * @param msg
     */
    public void fanoutSend(String msg) {

        this.rabbitTemplate.convertAndSend("fanout.cww.q.exchange", "", msg);
    }
}
