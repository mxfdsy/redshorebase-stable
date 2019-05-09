package cww.alittlegirl.controller;

import cww.alittlegirl.constants.Constants;
import cww.alittlegirl.util.ResultBuilderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class DemoController {
    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);


    @RequestMapping(value = "/demo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String demo(@RequestBody String payload) {

        int a = 1 / 0;
        return ResultBuilderUtils.buildSuccess(Constants.SUCCESS);
    }


}
