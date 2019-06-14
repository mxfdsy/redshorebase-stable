package cww.redshorebase.mq;

import cww.redshorebase.mq.DelayQueue.ProcessReceiver;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExchangeConfig {

    //==============以下点对点交换器==========
    @Bean
    public Queue helloDirect() {
        return new Queue("direct.hello.q");
    }

    @Bean
    public DirectExchange newDirectExchange() {
        return new DirectExchange("direct.hello.q.exchange");
    }

    @Bean
    public Binding bindingDirectExchangeMessage() {
        return BindingBuilder
                .bind(helloDirect())
                .to(newDirectExchange())
                .with("direct.hello.q)");
    }


    //===============以上点对点交换器==========


    /**
     * ===============以下fanout交换器===============
     */
    @Bean
    public Queue helloFanout() {

        return new Queue("fanout.cww.q");
    }

    @Bean
    public Queue helloFanout2() {
        return new Queue("fanout.cww.q2");
    }

    @Bean
    public FanoutExchange newFanoutExchange() {
        return new FanoutExchange("fanout.cww.q.exchange");
    }


    @Bean
    public Binding bindingFanoutExchangeMessage() {
        return BindingBuilder
                .bind(helloFanout())
                .to(newFanoutExchange());
    }


    @Bean
    public Binding bindingFanout2ExchangeMessage() {
        return BindingBuilder
                .bind(helloFanout2())
                .to(newFanoutExchange());
    }

    /**
     * ===============以上fanout交换器===============
     */


    /**
     * ===============以下topic交换器===============
     */


    @Bean
    public TopicExchange newTopicExchange() {
        return new TopicExchange("topic.cww.exchange");
    }


    @Bean
    public Queue helloTopic1() {
        Queue queue = new Queue("topic.log.error.error");
        return new Queue("topic.log.error.error");
    }

    @Bean
    public Queue helloTopic2() {
        return new Queue("topic.log.warn.normal");
    }

    @Bean
    public Queue helloTopic3() {
        return new Queue("topic.log.info.normal");
    }

    @Bean
    public Queue helloTopic4() {
        return new Queue("topic.log.all");
    }


    @Bean
    public Binding bindingTopicExchangeMessage1() {
        return BindingBuilder
                .bind(helloTopic1())
                .to(newTopicExchange())
                .with("topic.log.error.error");
    }

    @Bean
    public Binding bindingTopicExchangeMessage2() {
        return BindingBuilder
                .bind(helloTopic2())
                .to(newTopicExchange())
                .with("topic.log.warn.normal");
    }

    @Bean
    public Binding bindingTopicExchangeMessage3() {
        return BindingBuilder
                .bind(helloTopic3())
                .to(newTopicExchange())
                .with("topic.log.info.normal");
    }

    @Bean
    public Binding bindingTopicExchangeMessage4() {
        return BindingBuilder
                .bind(helloTopic4())
                .to(newTopicExchange())
                .with("topic.log.#");
    }

    /**
     * ===============以上topic交换器===============
     */

    /**
     * ===============以下是延迟队列交换器===============
     */
    @Bean
    Queue delayQueuePerMessageTTL() {
        return QueueBuilder.durable("delay_queue_per_message_ttl")
                .withArgument("x-dead-letter-exchange", "xxx-exchange")
                .withArgument("x-dead-letter-routing-key", "delay_process_queue")
                .build();
    }
    @Bean
    Queue delayProcessQueue() {
        return QueueBuilder.durable("delay_process_queue")
                .build();
    }

    @Bean
    DirectExchange delayExchange() {
        return new DirectExchange("xxx-exchange");
    }
    @Bean
    Binding dlxBinding() {
        return BindingBuilder
                .bind(delayProcessQueue())
                .to(delayExchange())
                .with("delay_process_queue");
    }


    /**
     * ===============以上是延迟队列交换器===============
     */



    @Bean
    Queue WillErrorQ() {
        return new Queue("will_error_q");
    }


    /**
     * 创建delay_queue_per_queue_ttl队列
     *
     * @return
     */
    @Bean
    Queue delayQueuePerQueueTTL() {
        return QueueBuilder.durable("xxxxx")
                .withArgument("x-dead-letter-exchange", "xxx-exchange") // DLX
                .withArgument("x-dead-letter-routing-key", "delay_process_queue") // dead letter携带的routing key
                .withArgument("x-message-ttl", 2000) // 设置队列的过期时间
                .build();}



    /**
     * 定义delay_process_queue队列的Listener Container
     *
     * @param connectionFactory
     * @return
     */
    @Bean
    SimpleMessageListenerContainer processContainer(ConnectionFactory connectionFactory, ProcessReceiver processReceiver) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames("will_error_q"); //
        container.setMessageListener(new MessageListenerAdapter(processReceiver));
        return container;
    }




}
