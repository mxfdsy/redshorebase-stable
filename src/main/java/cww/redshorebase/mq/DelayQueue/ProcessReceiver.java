package cww.redshorebase.mq.DelayQueue;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.stereotype.Component;

@Component
public class ProcessReceiver {


    @RabbitHandler
    public void receive(String payload) throws RuntimeException {

        if (payload.equals("FAIL_MESSAGE")) {
            int i = 1 / 0;
        }
        System.out.println(payload);
    }


}
