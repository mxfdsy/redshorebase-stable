package cww.redshorebase.controller;

import cww.redshorebase.constants.Constants;
import cww.redshorebase.multidatasource.localhost.StockMapper;
import cww.redshorebase.util.ResultBuilderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

@Controller
@RequestMapping
public class StockController {


    class TestStock implements Runnable{
        @Override
        public void run() {

            try {

                Thread.sleep(3000);
                cyclicBarrier.await();
                Integer result = stockMapper.updateStock(1, 2);
                System.out.println(result);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }

    @Autowired
    private StockMapper stockMapper ;

    CyclicBarrier cyclicBarrier = new CyclicBarrier(20);

    @RequestMapping(value = "/stock", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String stock() {


        for (int i = 0; i <20; i++) {
            new Thread(new TestStock()).start();
        }

//        Integer i = stockMapper.updateStock(1, 2);
//        System.out.println(i);

        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }
}
