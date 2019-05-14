package cww.redshorebase.hander;

import org.springframework.stereotype.Component;

@Component
public class DemoRabbitmqHandler {



    public void receiveDemoMessage(String message) {
        System.out.println(message);
    }
}
