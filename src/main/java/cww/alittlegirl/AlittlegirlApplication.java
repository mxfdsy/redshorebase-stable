package cww.alittlegirl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AlittlegirlApplication {

    @RequestMapping("/")
    public String hellow() {
        return "hello";
    }

    public static void main(String[] args) {
        SpringApplication.run(AlittlegirlApplication.class, args);
    }

}
