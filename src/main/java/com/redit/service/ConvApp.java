package com.redit.service;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class ConvApp extends Application {

    private Set<Object> singletons = new HashSet<>();

    public ConvApp() {

//        singletons.add(new CarromServiceImpl());

        System.out.println("I'm here");
        // Register exceptionMappers
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

}
