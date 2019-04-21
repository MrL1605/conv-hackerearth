package com.redit;

import com.redit.service.ConvService;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.jboss.resteasy.plugins.server.servlet.HttpServletDispatcher;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class ConvApp extends Application {

    private static final String APPLICATION_PATH = "/api";
    private static final String CONTEXT_ROOT = "/";

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

    private static Set<Object> singletons = new HashSet<>();

    public ConvApp() {
    }

    public static void main(String[] args) {
        try {
            singletons.add(new ConvService());
            new ConvApp().run();
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    public void run() throws Exception {

        final int port = 8080;
        final Server server = new Server(port);

        // Setup the basic Application "context" at "/".
        // This is also known as the handler tree (in Jetty speak).
        final ServletContextHandler context = new ServletContextHandler(
                server, CONTEXT_ROOT);

        // Setup RESTEasy's HttpServletDispatcher at "/api/*".
        final ServletHolder restEasyServlet = new ServletHolder(new HttpServletDispatcher());
        restEasyServlet.setInitParameter("resteasy.servlet.mapping.prefix", APPLICATION_PATH);
        restEasyServlet.setInitParameter("javax.ws.rs.Application",
                "com.redit.ConvApp");
        context.addServlet(restEasyServlet, APPLICATION_PATH + "/*");

        // Setup the DefaultServlet at "/".
        final ServletHolder defaultServlet = new ServletHolder(
                new DefaultServlet());
        context.addServlet(defaultServlet, CONTEXT_ROOT);

        server.start();
        server.join();
    }

}
