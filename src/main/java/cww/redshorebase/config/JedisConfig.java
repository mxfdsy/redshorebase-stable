package cww.redshorebase.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JedisConfig {


    @Value("${spring.redis.host}")
    private String ip;


    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.password}")
    private String auth;

    @Bean
    public JedisUtils getJedis() {
        return new JedisUtils(ip, port, auth);
    }

}
