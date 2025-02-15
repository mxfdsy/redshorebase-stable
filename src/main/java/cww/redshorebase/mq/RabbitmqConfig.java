package cww.redshorebase.mq;

import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.api.RabbitListenerErrorHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqConfig {
    @Value("${spring.rabbitmq.host}")
    private String addresses;

    @Value("${spring.rabbitmq.port}")
    private String port;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;

    @Value("${spring.rabbitmq.virtual-host}")
    private String virtualHost;

    @Value("${spring.rabbitmq.publisher-confirms}")
    private boolean publisherConfirms;


    @Bean
    public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory) {
        return new RabbitAdmin(connectionFactory);
    }


    @Bean
    public ConnectionFactory connectionFactory() {

        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setAddresses(addresses + ":" + port);
        connectionFactory.setUsername(username);
        connectionFactory.setPassword(password);
        connectionFactory.setVirtualHost(virtualHost);
        /** 如果要进行消息回调，则这里必须要设置为true */
        connectionFactory.setPublisherConfirms(publisherConfirms);
        return connectionFactory;
    }

    @Bean
    public RabbitTemplate newRabbitTemplate() {
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
        template.setMandatory(true);
        template.setConfirmCallback(confirmCallback());
        template.setReturnCallback(returnCallback());
        return template;
    }

    @Bean
    public RabbitTemplate.ConfirmCallback confirmCallback() {
        return new RabbitTemplate.ConfirmCallback() {

            @Override
            public void confirm(CorrelationData correlationData,
                                boolean ack, String cause) {
                if (ack) {
                    System.out.println("发送者确认发送给mq成功");
                } else {
                    //处理失败的消息
                    System.out.println("发送者发送给mq失败,考虑重发:" + cause);
                }
            }
        };
    }

    @Bean
    public RabbitTemplate.ReturnCallback returnCallback() {
        return new RabbitTemplate.ReturnCallback() {

            @Override
            public void returnedMessage(Message message,
                                        int replyCode,
                                        String replyText,
                                        String exchange,
                                        String routingKey) {
                System.out.println("无法路由的消息，需要考虑另外处理。");
                System.out.println("Returned replyText：" + replyText);
                System.out.println("Returned exchange：" + exchange);
                System.out.println("Returned routingKey：" + routingKey);
                String msgJson = new String(message.getBody());
                System.out.println("Returned Message：" + msgJson);
            }
        };


    }

    @Bean
    public RabbitListenerErrorHandler rabbitListenerErrorHandler() {
        return (amqpMessage, message, exception) -> {

            System.out.println("-------------------------------------" + message);

            throw new AmqpRejectAndDontRequeueException(exception.getMessage(), exception.getCause());
        };
    }


    //===============消费者确认(手动确认设置) ==========
//    @Bean
//    public SimpleMessageListenerContainer messageContainer() {
//        SimpleMessageListenerContainer container
//                = new SimpleMessageListenerContainer(connectionFactory());
//        container.setQueues(userQueue());
//        container.setAcknowledgeMode(AcknowledgeMode.MANUAL);
//        container.setMessageListener(userReceiver);
//        return container;
//    }
}
