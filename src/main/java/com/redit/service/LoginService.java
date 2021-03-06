package com.redit.service;

import com.j256.ormlite.support.ConnectionSource;
import com.redit.db.Employee;
import com.redit.db.LoginCred;
import com.redit.db.Session;
import com.redit.utils.ValidationException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import static com.redit.ConvApp.getConnection;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */
@Path("/login")
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class LoginService {

    @POST
    @Path("login")
    @Consumes(APPLICATION_JSON)
    public int login(@Context HttpServletRequest request,
                     @Context HttpServletResponse response,
                     LoginCred cred) throws SQLException, IOException {

        try (ConnectionSource con = getConnection()) {

            List<Employee> emp = Employee.getDao(con).queryForEq("name", cred.userId);
            if (emp.size() != 1)
                throw new ValidationException("No such user");

            if (!emp.get(0).password.equals(cred.password))
                throw new ValidationException("Incorrect credentials");

            if (Session.getDao(con).queryForEq("user", emp.get(0).id).size() != 0)
                throw new ValidationException("User already logged in");

            String sessionId = System.currentTimeMillis() + "@" + emp.get(0).name;

            Cookie c = new Cookie("session_id", sessionId);
            c.setPath("/");
            // TODO: If possible use DN
            // c.setDomain(System.getenv("LOGIN_DN"));

            // Only set cookie secure only if login URL was https
            if (request.getRequestURL().toString().startsWith("https"))
                c.setSecure(true);
            response.addCookie(c);

            return Session.getDao(con).create(new Session(emp.get(0).id, sessionId));
        }
    }

    @GET
    @Path("logout")
    public int logout(@Context HttpServletRequest request,
                      @Context HttpServletResponse response) throws SQLException, IOException {

        try (ConnectionSource con = getConnection()) {

            String sessionId = "";
            for (Cookie c : request.getCookies()) {
                if (c.getName().equals("session_id"))
                    sessionId = c.getValue();
            }

            List<Session> sessionList = Session.getDao(con).queryForEq("session_id", sessionId);
            int count = 0;
            for (Session s : sessionList)
                count += Session.getDao(con).delete(s);

            Cookie c = new Cookie("session_id", "");
            c.setPath("/");
            c.setMaxAge(-1);
            // TODO: If possible use DN
            // c.setDomain(System.getenv("LOGIN_DN"));

            // Only set cookie secure only if login URL was https
            if (request.getRequestURL().toString().startsWith("https"))
                c.setSecure(true);
            response.addCookie(c);
            return count;
        }
    }

}
