package racegrid.editor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@EnableAutoConfiguration
@ComponentScan({
        "racegrid.controller",
        "racegrid.config"
})
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class);
    }
}