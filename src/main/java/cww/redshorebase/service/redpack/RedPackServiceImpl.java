package cww.redshorebase.service.redpack;

import com.alibaba.fastjson.JSONObject;
import cww.redshorebase.config.JedisUtils;
import cww.redshorebase.constants.Basic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CountDownLatch;

@Service
public class RedPackServiceImpl implements RedPackService {

    @Autowired
    private JedisUtils jedisUtils;

    @Override
    public void setRedPackToRedis() {

        final CountDownLatch latch = new CountDownLatch(Basic.threadCount);

        for (int i = 0; i < Basic.threadCount; i++) {
            final int page = i;
            Thread thread = new Thread(() -> {
                //每个线程要初始化多少个红包
                int per = Basic.honBaoCount / Basic.threadCount;

                JSONObject object = new JSONObject();

                for (int j = page * per; j < (page + 1) * per; j++) { //从0开始，直到
                    object.put("id", "rid_" + j); //红包ID
                    object.put("money", j);   //红包金额
                    //lpush key value===lpush hongBaoPoolKey {id:rid_1, money:23}
                    jedisUtils.lpush("cwwhbk", object.toJSONString());
                }
                latch.countDown(); //发枪器递减
            });
            thread.start();
        }
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Override
    public void getRedPackFormRedis() {
        final CountDownLatch latch = new CountDownLatch(Basic.threadCount);//20 //发枪器
        for (int i = 0; i < Basic.threadCount; i++) {  //20线程
            Thread thread = new Thread() {
                public void run() {
                    //拿到jedis连接
                    JedisUtils jedis = new JedisUtils(Basic.ip, Basic.port, Basic.auth);
                    while (true) {
                        //模拟一个用户ID使用UUID XXXX
                        String userid = UUID.randomUUID().toString();

                        //抢红包  eval 可以直接调用我们LUA脚本里的业务代码  object ={rid_1:1, money:9, userid:001}
                        Object object = jedis.eval(Basic.getHongBaoScript, 4, Basic.hongBaoPoolKey, Basic.hongBaoDetailListKey, Basic.userIdRecordKey, userid);


                        if (null != object) {
                            System.out.println("用户ID号：" + userid + " 抢到红包的详情是 " + object);
                        } else {
                            if (jedis.llen(Basic.hongBaoPoolKey) == 0) {
                                break;
                            }
                        }
                    }
                    latch.countDown();
                }
            };
            thread.start();

        }
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }
}
