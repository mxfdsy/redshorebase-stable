package cww.redshorebase.controller;

import cww.redshorebase.constants.Constants;
import cww.redshorebase.service.redpack.RedPackService;
import cww.redshorebase.util.ResultBuilderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedPackController {
    @Autowired
    private RedPackService redPackService;

    @RequestMapping(value = "/redPack", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String redPack() {
        redPackService.setRedPackToRedis();

        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }
}
