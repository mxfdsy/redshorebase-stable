package cww.redshorebase.listener;


import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


@Component
public class EnjoyApplicationRunner implements ApplicationRunner {
    /**
     * 7 -----(8在 EnjoyCommandLineRunner)
     *
     * @param args
     * @throws Exception
     */
    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("EnjoyApplicationRunner.run()执行了");
    }
}
