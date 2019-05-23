package cww.redshorebase.service.redpack;

import cww.redshorebase.constants.Constants;
import cww.redshorebase.util.ResultBuilderUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

public class RedPackServiceImplTest {
    @Autowired
    private RedPackService redPackService ;


    @Test
    public String redPack(@RequestBody String payload) {
        redPackService.setRedPackToRedis();
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }

}