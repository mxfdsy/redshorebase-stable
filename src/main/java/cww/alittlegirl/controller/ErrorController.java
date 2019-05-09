package cww.alittlegirl.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorController {

    @RequestMapping("/404.do")
    public Object error_404() {
        return "这是404的报错页面";
    }
}
