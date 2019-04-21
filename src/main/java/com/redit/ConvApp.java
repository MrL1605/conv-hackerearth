package com.redit;

import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.jdbc.JdbcPooledConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.support.DatabaseConnection;
import com.j256.ormlite.table.TableUtils;
import com.redit.db.Employee;
import com.redit.db.EmployeeExpenses;
import com.redit.db.Expense;
import com.redit.service.ConvService;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.jboss.resteasy.plugins.server.servlet.HttpServletDispatcher;

import javax.ws.rs.core.Application;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

public class ConvApp extends Application {

    private static final String APPLICATION_PATH = "/api";
    private static final String CONTEXT_ROOT = "/";
    private static final String DB_URL = "jdbc:mariadb://conv-db:3306/conv";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "redit9";
    private static Set<Object> singletons = new HashSet<>();

    public ConvApp() {
    }

    public static void main(String[] args) {
        try {
            singletons.add(new ConvService());

            // Setup ORM
            setupSeed();

            new ConvApp().run();

        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    public static JdbcConnectionSource getConnection() throws SQLException {
        return new JdbcPooledConnectionSource(DB_URL, DB_USER, DB_PASS);
    }

    public static void setupSeed() throws SQLException, IOException {


        /// Create Database, if not exists
        try (ConnectionSource con = new JdbcPooledConnectionSource(
                "jdbc:mariadb://conv-db:3306", DB_USER, DB_PASS)) {

            // To start with empty database during dev
            con.getReadWriteConnection("some_table").executeStatement(
                    "DROP DATABASE IF EXISTS conv;", DatabaseConnection.DEFAULT_RESULT_FLAGS
            );

            con.getReadWriteConnection("some_table").executeStatement(
                    "CREATE DATABASE IF NOT EXISTS conv;", DatabaseConnection.DEFAULT_RESULT_FLAGS
            );
        }
        // Setup seed for Application
        try (ConnectionSource con = getConnection()) {
            TableUtils.createTableIfNotExists(con, Employee.class);
            TableUtils.createTableIfNotExists(con, Expense.class);
            TableUtils.createTableIfNotExists(con, EmployeeExpenses.class);
            if (Employee.getDao(con).countOf() != 0) {
                return;
            }

            for (int numEmp = 0; numEmp < 5; numEmp++) {
                Employee.getDao(con).create(new Employee("Employee" + numEmp, false));
            }
            for (int numMan = 0; numMan < 3; numMan++) {
                Employee.getDao(con).create(new Employee("Manager" + numMan, true));
            }

        }
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

    public void run() throws Exception {

        /*
            Setup server
        */
        final int port = 8080;
        final Server server = new Server(port);

        // Setup the basic Application "context" at "/".
        final ServletContextHandler context = new ServletContextHandler(
                server, CONTEXT_ROOT);

        // Setup RESTEasy's HttpServletDispatcher at "/api/*".
        final ServletHolder restEasyServlet = new ServletHolder(new HttpServletDispatcher());
        restEasyServlet.setInitParameter("resteasy.servlet.mapping.prefix", APPLICATION_PATH);
        restEasyServlet.setInitParameter("javax.ws.rs.Application", "com.redit.ConvApp");
        context.addServlet(restEasyServlet, APPLICATION_PATH + "/*");
        final ServletHolder defaultServlet = new ServletHolder(new DefaultServlet());
        context.addServlet(defaultServlet, CONTEXT_ROOT);

        server.start();
        server.join();
    }
}
