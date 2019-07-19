package cww.redshorebase.controller;

import com.demo.dubboapi.dubbo.ExposeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class DubboController {

    @Autowired
    private ExposeService exposeService;

    @RequestMapping(value = "/dubboGet", method = RequestMethod.GET)
    @ResponseBody
    public String dubboGet() {
        String data = exposeService.getData();
        return data;
    }
}
