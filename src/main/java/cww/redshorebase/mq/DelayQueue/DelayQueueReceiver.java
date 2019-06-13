package cww.redshorebase.mq.DelayQueue;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "delay_process_queue")
public class DelayQueueReceiver {

    @RabbitHandler  //指定对消息的处理
    public void process(String msg) {
        System.out.println("DelayQueueReceiver收到" + msg);
    }
}
