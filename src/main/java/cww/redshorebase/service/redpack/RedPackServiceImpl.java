package cww.redshorebase.service.redpack;

import com.alibaba.fastjson.JSONObject;
import cww.redshorebase.config.JedisUtils;
import cww.redshorebase.constants.Basic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CountDownLatch;

@Service
public class RedPackServiceImpl implements RedPackService {

    @Autowired
    private JedisUtils jedisUtils;

    @Override
    public void setRedPackToRedis() {

        final CountDownLatch latch = new CountDownLatch(Basic.threadCount);
        for(int i = 0 ; i < Basic.threadCount; i++){
            final int page = i;
            Thread thread = new Thread(() -> {
                //每个线程要初始化多少个红包
                int per = Basic.honBaoCount/ Basic.threadCount;

                JSONObject object = new JSONObject();

                for(int j = page * per ; j < (page+1) * per; j++){ //从0开始，直到
                    object.put("id", "rid_"+j); //红包ID
                    object.put("money", j);   //红包金额
                    //lpush key value===lpush hongBaoPoolKey {id:rid_1, money:23}
                    jedisUtils.lpush("cwwhbk", object.toJSONString());
                }
                latch.countDown(); //发枪器递减
            });
            thread.start();
        }

    }

    @Override
    public void getRedPackFormRedis() {



    }
}
