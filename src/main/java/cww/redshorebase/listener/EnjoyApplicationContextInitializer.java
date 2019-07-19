package cww.redshorebase.listener;


import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * 初始化调用后的类
 */
public class EnjoyApplicationContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    /**
     * 3 spring 容器初始化
     *
     * @param applicationContext
     */
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        System.out.println("EnjoyApplicationContextInitializer.initialize()执行了" + applicationContext);
    }
}
