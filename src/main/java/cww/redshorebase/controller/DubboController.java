package cww.redshorebase.controller;

import com.demo.dubboapi.dubbo.ExposeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;


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


    @RequestMapping(value = "/dubboGetById", method = RequestMethod.GET)
    @ResponseBody
    public String dubboGetById(HttpServletRequest request) {
        String id = request.getParameter("id");
        String data = exposeService.getUserById(id);
        return data;
    }

    @RequestMapping(value = "/callBack", method = RequestMethod.GET)
    @ResponseBody
    public String callBack(HttpServletRequest request) {
        String payload = request.getParameter("payload");
        String data = exposeService.callbackDemo(payload);
        return data;
    }
}
