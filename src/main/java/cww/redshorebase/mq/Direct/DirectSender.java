package cww.redshorebase.mq.Direct;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DirectSender {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 点对点发送
     *
     * @param msg
     */
    public void send(String msg) {
        String sendMsg = msg + "---" + System.currentTimeMillis();
        System.out.println("Sender : " + sendMsg);
        this.rabbitTemplate.convertAndSend("direct.hello.q", "direct.hello.q" + msg);
    }

}
