package cww.redshorebase;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
//@RestController
@MapperScan("cww.redshorebase.multidatasource")
@ImportResource(value = {
        "classpath:dubbo/*.xml"
})
//@EnableIntegration
public class AlittlegirlApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlittlegirlApplication.class, args);
    }
}
