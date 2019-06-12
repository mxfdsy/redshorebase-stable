package cww.redshorebase;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.integration.config.EnableIntegration;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@MapperScan("cww.redshorebase.multidatasource")
//@ImportResource(value = {
//        "classpath:rabbitmq/*.xml"
//})
@EnableIntegration
public class AlittlegirlApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlittlegirlApplication.class, args);
    }
}
