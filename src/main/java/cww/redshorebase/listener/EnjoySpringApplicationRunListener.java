package cww.redshorebase.listener;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

/**
 * springboot 运行监听类
 */
public class EnjoySpringApplicationRunListener implements SpringApplicationRunListener {

    //必须有的构造器
    public EnjoySpringApplicationRunListener(SpringApplication application, String[] args) {

    }

    /**
     * 1 、监听器启动
     *
     * @param
     */

    @Override
    public void starting() {
        System.out.println("EnjoySpringApplicationRunListener.starting()执行了");
    }

    /**
     * 2、环境准备（3在 EnjoyApplicationContextInitializer.initialize() ）
     *
     * @param environment
     */
    @Override
    public void environmentPrepared(ConfigurableEnvironment environment) {
        System.out.println("EnjoySpringApplicationRunListener.environmentPrepared()执行了");
    }


    /**
     * 4 ........
     *
     * @param context
     */
    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
        System.out.println("EnjoySpringApplicationRunListener.contextPrepared()执行了");
    }

    /**
     * 5 、加载上下文
     *
     * @param context
     */
    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
        System.out.println("EnjoySpringApplicationRunListener.contextLoaded()执行了");
    }


    /**
     * 6 、监听器已经启动（7 在 EnjoyApplicationRunner）
     *
     * @param context
     */
    @Override
    public void started(ConfigurableApplicationContext context) {
        System.out.println("EnjoySpringApplicationRunListener.started()执行了");
    }


    /**
     * 9 .-------
     *
     * @param context
     */
    @Override
    public void running(ConfigurableApplicationContext context) {
        System.out.println("EnjoySpringApplicationRunListener.running()执行了");
    }

    @Override
    public void failed(ConfigurableApplicationContext context, Throwable exception) {
        System.out.println("EnjoySpringApplicationRunListener.failed()执行了");
    }
}
