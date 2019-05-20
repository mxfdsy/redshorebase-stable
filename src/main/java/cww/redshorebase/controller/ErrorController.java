package cww.redshorebase.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {

    @RequestMapping("/login")
    public Object error_404() {
        return "login/login.html";
    }
}
