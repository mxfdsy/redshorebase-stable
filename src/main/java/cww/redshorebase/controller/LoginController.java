package cww.redshorebase.controller;

import com.alibaba.fastjson.JSONObject;
import cww.redshorebase.constants.Constants;
import cww.redshorebase.util.ResultBuilderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/")
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String login(@RequestBody String payload) {
        logger.info("login请求，入参：{}", payload);
        Object field = JSONObject.parseObject(payload).get("field");

        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }
}
