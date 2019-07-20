package cww.redshorebase.config.dubbo.callback;

import org.springframework.stereotype.Component;

@Component
public class CallBack {

    //第一个参数，为返回结果值，后续参数是入参
    public void onSuccess(String result, String payload) {
        System.out.printf("回调成功 结果值为%s入参信息为 %s%n", result, payload);
    }

    //第一个参数，为返回结果值，后续参数是入参
    public void onError(Throwable ex, String payload) {
        System.out.println("生成订单异常，请紧急处理,入参：" + payload);
        System.out.println(ex.getMessage());
    }
}
