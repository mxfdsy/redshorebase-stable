package cww.redshorebase.listener;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;


@Component
public class EnjoyCommandLineRunner implements CommandLineRunner {
    /**
     * 8
     *
     * @param args
     * @throws Exception
     */
    @Override
    public void run(String... args) throws Exception {
        System.out.println("EnjoyCommandLineRunner.run()执行了" + Arrays.asList(args));
    }
}
